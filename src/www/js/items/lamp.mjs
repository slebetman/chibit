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

		this.state = 0;

		this.setXY(x,y);
	}

	interact (actor) {
		if (!actor.tool || actor.tool.constructor.name !== 'Axe') {
			dialog("It's just a street lamp.");
		}
		else if (actor.tool.constructor.name === 'Axe') {
			actor.interacting = true;
			this.state = (this.state + 1) % 8;
			css(this.element,{
				transform: this.state < 4 ? 'skewX(0.5deg) translateX(-1px)' : '',
			});
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.state = 0;
				css(this.element,{
					transform: ''
				});
			}, 500);
		}
	}
}