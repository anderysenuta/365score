import type { IncomingMessage, ServerResponse } from 'node:http';

export type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => Promise<void>) => Promise<void>;
export type Handler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

export const composeMiddleware = (middlewares: Middleware[], handler: Handler): Handler => {
  return async (req: IncomingMessage, res: ServerResponse) => {
    let index = 0;

    const next = async (): Promise<void> => {
      if (index < middlewares.length) {
        const middleware = middlewares[index++];
        await middleware(req, res, next);
      } else {
        await handler(req, res);
      }
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
