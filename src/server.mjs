import express from 'express';
import { config, initConfig } from './lib/config.mjs';
import path from 'path';

async function  main () {
  await initConfig();

  const app = express();

  app.use(express.static(path.join(import.meta.dirname,'www')));

  app.listen(config.port, () => {
    console.log(`[server]: Server is running at http://localhost:${config.port}`);
  });
}

main();
