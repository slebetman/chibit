import { Floor } from "./floor.mjs";

/*
	Path logic:

	above

	  .█. = █

	   .
	  ██. = ◣

	   █
	  █◤. = █

	   .
	  .██ = ◢

	   █
	  .◥█ = █

	  ███ = █

	left

	  █
	 .█ = ◥

	  █
	 █◤ = █

	  .
	 .█ = █

	  .
	 ██ = █

	self

	  if there is path above and to the left default to ◤
 */

const pathSpriteSheet = './images/path-light.png';

export class StonePath extends Floor {
	constructor (x, y) {
		super(pathSpriteSheet, x, y);
	}
}

export class StonePathBottomRight extends Floor {
	constructor (x, y) {
		super(pathSpriteSheet, x, y, 0, -50);
	}
}

export class StonePathBottomLeft extends Floor {
	constructor (x, y) {
		super(pathSpriteSheet, x, y, 0, -100);
	}
}

export class StonePathTopRight extends Floor {
	constructor (x, y) {
		super(pathSpriteSheet, x, y, 0, -150);
	}
}

export class StonePathTopLeft extends Floor {
	constructor (x, y) {
		super(pathSpriteSheet, x, y, 0, -200);
	}
}