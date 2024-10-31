import express from 'express';
import { config, initConfig } from './lib/config.mjs';
import path from 'path';
import editRouter from './controllers/edit.mjs';

async function  main () {
	await initConfig();

	const app = express();

	app.use(express.json());

	app.use(editRouter);

	app.use(express.static(path.join(import.meta.dirname,'www')));

	app.listen(config.port, () => {
		console.log(`[server]: Server is running at http://localhost:${config.port}`);
	});
}

main();
