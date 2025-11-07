import http from 'node:http';
import { corsMiddleware } from './middlewares/cors.middleware';
import router from './routes';
import { initDatabase } from './services/postgres/postgres.service';
import { composeMiddleware } from './utils/middleware/compose';

const PORT = 3000;

const startServer = async () => {
  await initDatabase(); // should be at first for current POC

  const app = composeMiddleware(
    [
      corsMiddleware,
      // add additional middleware for auth, logging, body parsing, security checks, etc
    ],
    router,
  );

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch(console.error);
