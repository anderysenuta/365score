import type { IncomingMessage, ServerResponse } from 'node:http';

export const corsMiddleware = async (req: IncomingMessage, res: ServerResponse, next: () => Promise<void>) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  await next();
};
