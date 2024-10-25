import { Sprite } from "../sprite.mjs";
import { attachDebugBounds, css } from "../util.mjs";

export class Wall extends Sprite {
	static base = {
		x: 50,
		y: 60,
	}

	constructor (x, y) {
		super('./images/wall.png', 110, 110,{
			x1: 0, x2: 100,
			y1: 20, y2: 100,
		});

		// attachDebugBounds(this);

		this.setXY(x,y);
	}
}