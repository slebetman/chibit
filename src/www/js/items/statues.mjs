import { Sprite } from "../sprite.mjs";
import { css } from "../util.mjs";

export class Statue1 extends Sprite {
	static base = {
		x: 48,
		y: 100,
	}

	constructor (x, y) {
		super('./images/statue1.png', 96, 130,{
			x1: 5, x2: 91,
			y1: 75, y2: 120,
		});
		this.setXY(x,y);
	}
}