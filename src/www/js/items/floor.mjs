import { Sprite } from "../sprite.mjs";
import { css } from "../util.mjs";

class Floor extends Sprite {
	static base = {
		x: 50,
		y: 25,
	}

	constructor (spriteSheet, x, y) {
		super(spriteSheet, 100, 50,{
			x1: 0, x2: 0,
			y1: 0, y2: 0,
		});
		this.setXY(x,y);
		css(this.element,{
			zIndex: -1,
		})
	}
}

export class WoodFloor extends Floor {
	constructor (x, y) {
		super('./images/floor-wood.png', x, y);
	}
}

export class StoneFloor extends Floor {
	constructor (x, y) {
		super('./images/floor-stone.png', x, y);
	}
}