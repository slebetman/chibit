import { Sprite } from "./sprite.mjs";

export class Wall extends Sprite {
	constructor (x, y) {
		super('./images/wall1.png', 128, 256,{
			x1: 0, x2: 128,
			y1: 20, y2: 256,
		});
		this.setXY(x,y);
	}
}