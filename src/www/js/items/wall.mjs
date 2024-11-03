import { Sprite } from "../lib/sprite.mjs";
import { attachDebugBounds, css } from "../lib/util.mjs";

export class Wall extends Sprite {
	static base = {
		x: 50,
		y: 60,
	}

	constructor (x, y) {
		super('./images/wall.png', 110, 110,{
			x1: 0, x2: 100,
			y1: 45, y2: 100,
		});

		// css(this.element,{
		// 	opacity: 0.5,
		// })

		// attachDebugBounds(this, 'yellow');

		this.setXY(x,y);
	}
}