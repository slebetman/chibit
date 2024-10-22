import { Chibit } from "./chibit.mjs";

let chibit = new Chibit()
	.setXY(400,200)
	.update();

const keys = {
	up: false,
	down: false,
	left: false,
	right: false,
	shift: false,
}

function checkKeys () {
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
	console.log(e.key, e.keyCode);

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
		case 'Shift':
			keys.shift = true;
			break;
		case 'Control':
		case ' ':
			chibit.teleport();
			break;
	}

	checkKeys();
}

document.onkeyup = function (e) {
	console.log(e.key, e.keyCode);

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
	}

	checkKeys();
}

setInterval(() => {
	chibit.walk();
}, 10);