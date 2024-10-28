import { dialog } from "../dialog.mjs";
import { Sprite } from "../sprite.mjs";
import { css } from "../util.mjs";

export class Lamp extends Sprite {
	static base = {
		x: 50,
		y: 170,
	}

	constructor (x, y) {
		super('./images/lamp.png', 100, 200,{
			x1: 30, x2: 70,
			y1: 165, y2: 200,
		});
		this.setXY(x,y);
	}

	interact () {
		dialog("It's just a street lamp.");
	}
}