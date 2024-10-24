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
			y1: 38, y2: 88,
		}, offsetX, offsetY);

		// css(this.element,{
		// 	border: '1px dashed cyan',
		// })

		// const debugBounds = document.createElement('div');

		// css(debugBounds,{
		// 	position: 'relative',
		// 	border: '1px solid blue',
		// 	width: `${this.bounds.x2 - this.bounds.x1}px`,
		// 	left: `${this.bounds.x1}px`,
		// 	height: `${this.bounds.y2 - this.bounds.y1}px`,
		// 	top: `${this.bounds.y1}px`,
		// });

		// this.element.appendChild(debugBounds);
		
		this.setXY(x,y);
	}
}