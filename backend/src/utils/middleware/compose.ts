import type { IncomingMessage, ServerResponse } from 'node:http';

export type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => Promise<void>) => Promise<void>;
export type Handler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

export const composeMiddleware = (middlewares: Middleware[], handler: Handler): Handler => {
  return async (req: IncomingMessage, res: ServerResponse) => {
    const next = async () => {
      for await (const middleware of middlewares) {
        await middleware(req, res, next);
      }
      await handler(req, res);
    };

    try {
      await next();
    } catch (error) {
      console.error('middleware chain error:', error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  };
};
