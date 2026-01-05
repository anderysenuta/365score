import type { IncomingMessage, ServerResponse } from 'node:http';
import { URL } from 'node:url';
import { StatusCodes } from 'http-status-codes';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export type ControllerEvent = {
  method: Method;
  body: unknown;
  params: Record<string, string | number | boolean>;
  query: Record<string, string | number | boolean>;
};

export type ControllerResponse<TBody = unknown> = {
  body: TBody;
  statusCode?: number;
  headers?: Record<string, string>;
};

type RouteHandler = (event: ControllerEvent) => Promise<ControllerResponse>;
export type Route = [Method, string, RouteHandler];

const createRouter = (routes: Route[]) => {
  const compiledRoutes = routes.map(([method, pattern, handler]) => ({
    method: method.toUpperCase(),
    pattern,
    handler,
  }));

  return async (req: IncomingMessage, res: ServerResponse) => {
    const { method: requestMethod, url, headers } = req;
    const { pathname, searchParams } = new URL(`https://${headers.host || 'localhost'}${url}`);

    for (const route of compiledRoutes) {
      const { method, pattern, handler } = route;

      if (method !== requestMethod.toUpperCase()) continue;

      const match = matchRoute(pattern, pathname);
      if (!match) continue;

      try {
        const body = req.body ?? {};
        const query = parseQuery(searchParams);

        const event: ControllerEvent = {
          method: method as Method,
          body,
          params: match.params,
          query,
        };

        const response = await handler(event);

        const statusCode = response.statusCode || StatusCodes.OK;
        const headers = {
          'Content-Type': 'application/json',
          ...response.headers,
        };

        res.writeHead(statusCode, headers);
        res.end(JSON.stringify(response.body));
        return;
      } catch (error) {
        console.error('Handler error:', error);
        res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR);
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
        return;
      }
    }

    // 404
    res.writeHead(StatusCodes.NOT_FOUND);
    res.end(JSON.stringify({ error: 'Not Found' }));
  };
};

const parseQuery = (searchParams: URLSearchParams): Record<string, string> => {
  const query: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }

  return query;
};

const matchRoute = (pattern: string, pathname: string): { params: Record<string, string> } | null => {
  const patternParts = pattern.split('/');
  const pathParts = pathname.split('/');

  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const segment = patternParts[i];

    if (segment.startsWith('{') && segment.endsWith('}')) {
      const paramName = segment.slice(1, -1);
      params[paramName] = decodeURIComponent(pathParts[i]); // URL decode params
    } else if (segment !== pathParts[i]) {
      return null;
    }
  }

  return { params };
};

export default createRouter;
