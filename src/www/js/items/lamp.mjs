import { Sprite } from "../sprite.mjs";
import { css } from "../util.mjs";

export class Lamp extends Sprite {
	constructor (x, y) {
		super('./images/lamp.png', 100, 200,{
			x1: 20, x2: 80,
			y1: 165, y2: 200,
		});
		this.setXY(x,y - 120);
	}
}