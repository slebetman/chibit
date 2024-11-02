import { Router } from 'express';
import * as fs from 'fs/promises';
import * as path from 'path';
import { html } from '../lib/html.mjs';

const route = Router();

route.post('/edit/:file', async (req, res) => {
	const map = req.body.map;
	const fileName = req.params.file;

	if (map && map !== '') {
		try {
			await fs.writeFile(
				path.join(import.meta.dirname,'../www/data', fileName),
				map
			);
		}
		catch (err) {
			console.error(err);
			res.end('Error saving map file! ' + err.message);
			return;	
		}

		res.end(`Saved ${fileName}`);
	}
	else {
		res.end('Error saving map file!');
	}
});

route.get('/edit/:file', async (req, res) => {
	let rawTxt;
	const fileName = req.params.file;

	try {
		rawTxt = await fs.readFile(
			path.join(import.meta.dirname,'../www/data', fileName),
			'utf8'
		);
	}
	catch (err) {
		rawTxt = '________';
	}

	const [ rawHeaders, rawMap ] = rawTxt.split(/^____+\s*$/m);

	res.end(html`
		<html>
			<head>
				<link rel="stylesheet" href="/editor.css">
			</head>
			<body>
				<div>
					<h1>Headers</h1>
					<pre id="headers"
						contenteditable
						spellcheck="false"
					>${rawHeaders}</pre>
				</div>
				<div>
					<h1>Map</h1>
					<pre id="map"
						contenteditable
						spellcheck="false"
					>${rawMap}</pre>
				</div>
				<script src="/js/editor/main.mjs" type="module"></script>
			</body>
		</html>
	`);
});

export default route;