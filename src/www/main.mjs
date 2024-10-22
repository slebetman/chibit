import { Chibit } from "./chibit.mjs";

let chibit = new Chibit()
	.setXY(400,200)
	.update();

document.onkeydown = function (e) {
	console.log(e.key, e.keyCode);

	switch (e.key) {
		case 'a':
		case 'A':
		case 'ArrowLeft':
			chibit.moveLeft();
			break;
		case 'd':
		case 'D':
		case 'ArrowRight':
			chibit.moveRight();
			break;
		case 'w':
		case 'W':
		case 'ArrowUp':
			chibit.moveUp();
			break;
		case 's':
		case 'S':
		case 'ArrowDown':
			chibit.moveDown();
			break;
		case 'Shift':
			chibit.stepsize = 4;
			break;
		case 'Control':
		case ' ':
			chibit.teleport();
			break;
	}
}

document.onkeyup = function (e) {
	console.log(e.key, e.keyCode);

	switch (e.key) {
		case 'a':
		case 'A':
		case 'd':
		case 'D':
		case 'ArrowLeft':
		case 'ArrowRight':
			chibit.stopHorizontalMovement(); break;
		case 'w':
		case 'W':
		case 's':
		case 'S':
		case 'ArrowUp':
		case 'ArrowDown':
			chibit.stopVerticalMovement(); break;
		case 'Shift':
			chibit.stepsize = 2;
			break;
	}
}

setInterval(() => {
	chibit.walk();
}, 10);