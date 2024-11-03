import { Sprite } from "../lib/sprite.mjs";
import { css } from "../lib/util.mjs";

export class Floor extends Sprite {
	static base = {
		x: 50,
		y: 15,
	}

	/**
	 * @param {string} spriteSheet 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} offsetX 
	 * @param {number} offsetY 
	 */
	constructor (spriteSheet, x, y, offsetX = 0, offsetY = 0) {
		super(spriteSheet, 100, 50,{
			x1: 0, x2: 0,
			y1: 0, y2: 0,
		}, offsetX, offsetY);
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

export class TileFloor extends Floor {
	constructor (x, y) {
		super('./images/floor-tile.png', x, y);
	}
}


