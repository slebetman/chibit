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
			res.status(400).end('Error saving map file! ' + err.message);
			return;	
		}

		res.redirect(`/edit/${fileName}`);
	}
	else {
		res.status(400).end('Error saving map file!');
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
				<style>
					* {
						font-family: 'Courier New', Courier, monospace;
						margin: 0;
						padding: 0;
					}
					body {
						display: flex;
						flex-direction: row;
					}
					pre {
						margin: 0;
						padding: 5px;
						overflow: auto;
						outline: none;
						font-size: 12px;
						height: 94vh;
					}
					h1 {
						font-size: 18px;
					}
					pre#headers {
						width: 40vw;
						border-right: 1px solid #000;
						border-top: 1px solid #000;
					}
					pre#map {
						transform: scaleX(2) translateX(25%);
						width: 28.5vw;
						border-top: 1px solid #000;
					}
				</style>
			</head>
			<body>
				<div>
					<h1>Headers</h1>
					<pre id="headers" contenteditable spellcheck="false">${rawHeaders}</pre>
				</div>
				<div>
					<h1>Map</h1>
					<pre id="map" contenteditable spellcheck="false">${rawMap}</pre>
				</div>
				<script>
					document.onkeydown = function (e) {
						switch (e.key) {
							case 's':
								if (e.ctrlKey) {
									saveFile();
								}
								else {
									return;
								}
								break;
							default:
								return;
						}

						e.preventDefault();
						e.stopPropagation();
					}

					async function saveFile () {
						const headers = document.querySelector('#headers').innerText;
						const map = document.querySelector('#map').innerText;

						const rawText =
							headers.trim() +
							'\\n____________________________________\\n' +
							map;

						console.log(rawText);

						await fetch("/edit/${fileName}", {
							method: "POST",
							body: JSON.stringify({map: rawText}),
							headers: {
								"Content-Type": "application/json",
							},
						});

						alert('Saved ${fileName}')
					}
				</script>
			</body>
		</html>
	`);
});

export default route;