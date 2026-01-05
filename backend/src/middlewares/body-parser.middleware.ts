import type { IncomingMessage, ServerResponse } from 'node:http';
import { StatusCodes } from 'http-status-codes';

declare module 'node:http' {
  interface IncomingMessage {
    body?: unknown;
  }
}

type BodyParserConfig = {
  maxSize: number; // in bytes
};

const DEFAULT_CONFIG: BodyParserConfig = {
  maxSize: 1024 * 1024, // 1MB
};

export const createBodyParserMiddleware = (config: Partial<BodyParserConfig> = {}) => {
  const { maxSize } = { ...DEFAULT_CONFIG, ...config };

  return async (req: IncomingMessage, res: ServerResponse, next: () => Promise<void>) => {
    const method = req.method?.toUpperCase();

    if (method === 'GET' || method === 'HEAD' || method === 'DELETE' || method === 'OPTIONS') {
      req.body = {};
      await next();
      return;
    }

    try {
      req.body = await parseBody(req, maxSize);
      await next();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to parse request body';

      let statusCode = StatusCodes.BAD_REQUEST;

      if (errorMessage.includes('too large')) {
        statusCode = StatusCodes.REQUEST_TOO_LONG;
      }

      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: errorMessage,
          statusCode,
        }),
      );
    }
  };
};

const parseBody = async (req: IncomingMessage, maxSize: number): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;

    req.on('data', (chunk: Buffer) => {
      size += chunk.length;

      if (size > maxSize) {
        reject(new Error(`Request body too large. Max size: ${maxSize} bytes`));
        return;
      }

      body += chunk.toString('utf8');
    });

    req.on('end', () => {
      try {
        if (body) {
          const contentType = req.headers['content-type'];
          if (contentType && !contentType.includes('application/json')) {
            resolve(body); // return raw body for non-JSON
            return;
          }
          resolve(JSON.parse(body));
        } else {
          resolve({});
        }
      } catch (error) {
        reject(new Error('Invalid JSON in request body'));
      }
    });

    req.on('error', reject);
  });
};

export const bodyParserMiddleware = createBodyParserMiddleware();
