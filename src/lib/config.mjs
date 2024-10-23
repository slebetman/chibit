import fs from 'fs/promises';
import path from 'path';

export const config = {
	port: 3000
}

export async function initConfig () {
	try {
		const configFile = await fs.readFile(
			path.join(import.meta.dirname, '../../config.json')
		);

		const c = JSON.parse(configFile);

		for (const k in c) {
			config[k] = c[k];
		}
	}
	catch (err) {} // ignore
}
