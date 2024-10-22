import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

async function createServer() {
  const app = express();

  // API 라우트를 Vite 미들웨어보다 먼저 설정
  app.use('/api', (req, res) => {
    res.json({ message: "Hello from API!!!" });
  });

  let vite;
  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: path.resolve(__dirname, '..')
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, '../dist')));
  }

  // SPA를 위한 라우팅
  app.get('*', (req, res) => {
    if (isProduction) {
      res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    } else {
      vite.middlewares.handle(req, res);
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
