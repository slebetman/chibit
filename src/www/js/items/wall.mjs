import { Sprite } from "../sprite.mjs";
import { css } from "../util.mjs";

export class Wall extends Sprite {
	constructor (x, y) {
		super('./images/wall.png', 100, 100,{
			x1: 0, x2: 100,
			y1: 20, y2: 100,
		});
		css(this.element,{
			backgroundSize: '100px 100px'
		});
		this.setXY(x,y);
	}
}