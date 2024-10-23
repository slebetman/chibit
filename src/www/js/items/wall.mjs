import { Sprite } from "../sprite.mjs";
import { css } from "../util.mjs";

export class Wall extends Sprite {
	static base = {
		x: 50,
		y: 60,
	}

	constructor (x, y) {
		super('./images/wall.png', 100, 100,{
			x1: 0, x2: 100,
			y1: 20, y2: 100,
		});

		// const debugBounds = document.createElement('div');

		// css(debugBounds,{
		// 	position: 'relative',
		// 	border: '1px solid transparent',
		// 	width: '100px',
		// 	height: '80px',
		// 	top: '20px',
		// });

		// this.element.appendChild(debugBounds);

		css(this.element,{
			backgroundSize: '100px 100px'
		});
		this.setXY(x,y);
	}
}