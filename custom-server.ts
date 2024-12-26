// server.ts
import express, { Request, Response } from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Example custom API route
  server.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Hello from the custom server with TypeScript!' });
  });

  // Catch-all for Next.js pages
  server.all('*', (req: Request, res: Response) => handle(req, res));

  server.listen(PORT, (err?: Error) => {
    if (err) throw err;
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error starting server:', err);
});
