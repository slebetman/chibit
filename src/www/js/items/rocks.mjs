import { Sprite } from "../sprite.mjs";
import { css } from "../util.mjs";

let idx = 0;

const rockSprites = [
	'0px 0px',
	'-100px 0px',
	'-1=200px 0px',
	'0px -100px',
	'-100px -100px',
	'-200px -100px',
	'0px -200px',
	'-100px -200px',
	'-200px -200px',
]

export class Rock extends Sprite {
	static base = {
		x: 50,
		y: 60,
	}

	constructor (x, y) {
		idx = (idx + 1) % rockSprites.length;

		super('./images/rocks.png', 100, 100,{
			x1: 15, x2: 85,
			y1: 50, y2: 85,
		});
		css(this.element,{
			backgroundPosition: rockSprites[idx],
		});
		this.setXY(x,y);
	}
}