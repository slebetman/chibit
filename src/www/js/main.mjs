import { Chibit } from "./items/chibit.mjs";
import { items } from "./items.mjs";
import { drawMap } from "./lib/map-reader.mjs";
import { getNearestItems } from "./lib/collision-detection.mjs";
import { dialogIsActive } from "./lib/ui/dialog.mjs";
import { Hotbar } from "./lib/ui/hotbar.mjs";
import { $, appendItemToWorld } from "./lib/util.mjs";

async function main () {
	let started = false;
	const map = await (await fetch('/data/map.txt')).text();

	drawMap(map);

	const chibit = items.find(x => x instanceof Chibit);

	const hotbar = new Hotbar(chibit);

	const world = $('world');
	world.ondragover = (e) => {
		e.dataTransfer.dropEffect = 'move';
		e.preventDefault();
	};
	world.ondrop = (e) => {
		const idx = parseInt(e.dataTransfer.getData('application/tool-index'),10);
		chibit.dropItem(idx);
	}

	const savedState = localStorage.getItem('saved-state');
	if (savedState) {
		const {x,y,d} = JSON.parse(savedState);

		chibit.direction = d;
		chibit.setXY(x, y);
		chibit.update();
	}

	const keys = {
		up: false,
		down: false,
		left: false,
		right: false,
		shift: false,
	}

	function checkKeys () {
		if (dialogIsActive()) {
			chibit.stopHorizontalMovement();
			chibit.stopVerticalMovement();
			return;
		}

		if (keys.right) chibit.moveRight();
		else if (keys.left) chibit.moveLeft();
		else chibit.stopHorizontalMovement();

		if (keys.up) chibit.moveUp();
		else if (keys.down) chibit.moveDown();
		else chibit.stopVerticalMovement();

		if (keys.shift) chibit.stepsize = 4;
		else chibit.stepsize = 2;
	}

	document.onkeydown = function (e) {
		// console.log(e.key, e.keyCode);

		switch (e.key) {
			case 'a':
			case 'A':
			case 'ArrowLeft':
				keys.left = true;
				break;
			case 'd':
			case 'D':
			case 'ArrowRight':
				keys.right = true;
				break;
			case 'w':
			case 'W':
			case 'ArrowUp':
				keys.up = true;
				break;
			case 's':
			case 'S':
			case 'ArrowDown':
				keys.down = true;
				break;
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				hotbar.select(parseInt(e.key)-1);
				break;
			case '0':
				hotbar.select();
				break;
			case 'Shift':
				keys.shift = true;
				break;
			case ' ':
				if (!started) {
					started = true;
					chibit.startInteraction();
				}
				break;
			case 'q':
				chibit.dropItem();
				break;
			case 'Escape':
				if (e.ctrlKey) {
					localStorage.removeItem('saved-state');
					window.onbeforeunload = null;
					window.location.reload();
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

		checkKeys();
	}

	document.onkeyup = function (e) {
		// console.log(e.key, e.keyCode);

		switch (e.key) {
			case 'a':
			case 'A':
			case 'ArrowLeft':
				keys.left = false;
				break;
			case 'd':
			case 'D':
			case 'ArrowRight':
				keys.right = false;
				break;
			case 'w':
			case 'W':
			case 'ArrowUp':
				keys.up = false;
				break;
			case 's':
			case 'S':
			case 'ArrowDown':
				keys.down = false;
				break;
			case 'Shift':
				keys.shift = false;
				break;
			case ' ':
				started = false;
				chibit.stopInteraction();
				break;
			default:
				return;
		}

		e.preventDefault();
		e.stopPropagation();

		checkKeys();
	}

	document.onmousedown = (e) => {
		chibit.startInteraction();
		e.preventDefault();
		e.stopPropagation();
	}

	document.onmouseup = (e) => {
		chibit.stopInteraction();
		e.preventDefault();
		e.stopPropagation();
	}

	setInterval(() => {
		const d = Math.max(window.innerWidth, window.innerHeight) / 2;

		// Only process things within view of player:
		for (const i of getNearestItems(chibit, d + 200)) {
			i.animate();
		}
	}, 10);

	window.onresize = () => chibit.update();

	window.onbeforeunload = () => {
		const x = chibit.x;
		const y = chibit.y;
		const d = chibit.direction;

		localStorage.setItem('saved-state', JSON.stringify({x,y,d}));
	}

	window.onblur = () => {
		chibit.stopHorizontalMovement();
		chibit.stopVerticalMovement();
		chibit.stopInteraction();

		keys.up = false;
		keys.down = false;
		keys.left = false;
		keys.right = false;
		keys.shift = false;
	}
}

main();