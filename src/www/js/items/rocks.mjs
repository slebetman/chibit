import { Sprite } from "../sprite.mjs";
import { attachDebugBounds, css } from "../util.mjs";

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
			y1: 38, y2: 88,
		}, offsetX, offsetY);

		// attachDebugBounds(this, 'magenta');
		
		this.setXY(x,y);
	}
}