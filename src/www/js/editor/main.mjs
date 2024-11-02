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
	const fileName = window.location.href.split('/').pop();

	const rawText =
		headers.trim() +
		'\n____________________________________\n' +
		map;

	console.log(rawText);

	const response = await fetch(`/edit/${fileName}`, {
		method: "POST",
		body: JSON.stringify({map: rawText}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const message = await response.text();

	alert(message);
}