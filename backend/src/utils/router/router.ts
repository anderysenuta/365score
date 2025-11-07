import type { IncomingMessage, ServerResponse } from 'node:http';
import { StatusCodes } from 'http-status-codes';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export type ControllerEvent = {
  method: string;
  body: any;
  params: Record<string, string>;
  query: Record<string, string>;
};

export type ControllerResponse = {
  body: any;
  statusCode?: number;
  headers?: Record<string, string>;
};

type RouteHandler = (event: ControllerEvent) => Promise<ControllerResponse>;
export type Route = [Method, string, RouteHandler];

const createRouter = (routes: Route[]) => {
  const compiledRoutes = routes.map(([method, path, handler]) => ({
    method,
    path,
    handler,
  }));

  return async (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;

    for (const route of compiledRoutes) {
      const [reqPath, queryString] = url?.split('?') || [];

      if (route.method !== method) continue;
      // if (route.path !== reqPath) continue; // TODO: compare path with reqPath like /users/{id}/questions/{questionId} with /users/123/questions/456

      try {
        const body = parseBody(req);
        const params = parseParams(route.path, reqPath);
        const query = parseQuery(queryString);

        const event: ControllerEvent = {
          method: method || '',
          body,
          params,
          query,
        };

        const response = await route.handler(event);

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

const parseBody = (req: IncomingMessage) => {
  return {};
};
const parseParams = (path: string, matcher: string) => {
  // TODO implement helper to combin path params name with values like { id: 123, questionId: 456 }
  return {};
};
const parseQuery = (queryString: string) => {
  return {};
};

export default createRouter;
