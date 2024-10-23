import { Sprite } from "../sprite.mjs";
import { css } from "../util.mjs";

export class Tree1 extends Sprite {
	static base = {
		x: 130,
		y: 275,
	}

	constructor (x, y) {
		super('./images/tree1.png', 260, 320,{
			x1: 120, x2: 160,
			y1: 250, y2: 290,
		});
		this.setXY(x,y);
	}
}