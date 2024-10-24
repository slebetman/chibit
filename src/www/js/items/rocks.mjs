import { Sprite } from "../sprite.mjs";
import { css } from "../util.mjs";

let idx = 0;

const rockSprites = [
	[0,0], [-100,0], [-200,0],
	[0,-100], [-100,-100], [-200,-100],
	[0,-200], [-100,-200], [-200,-200],
];

export class Rock extends Sprite {
	static base = {
		x: 50,
		y: 60,
	}

	constructor (x, y) {
		idx = (idx + 1) % rockSprites.length;
		const [offsetX, offsetY] = rockSprites[idx];

		super('./images/rocks.png', 100, 100,{
			x1: 15, x2: 85,
			y1: 50, y2: 85,
		}, offsetX, offsetY);
		
		this.setXY(x,y);
	}
}