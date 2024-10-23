import { Sprite } from "../sprite.mjs";

export class Tree1 extends Sprite {
	static base = {
		x: 130,
		y: 275,
	}

	constructor (x, y) {
		super('./images/tree1.png', 260, 300,{
			x1: 100, x2: 160,
			y1: 250, y2: 300,
		});
		this.setXY(x,y);
	}
}