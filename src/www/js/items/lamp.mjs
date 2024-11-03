import { dialog } from "../lib/ui/dialog.mjs";
import { Sprite } from "../lib/sprite.mjs";
import { attachDebugBounds, css } from "../lib/util.mjs";

export class Lamp extends Sprite {
	static base = {
		x: 50,
		y: 170,
	}

	constructor (x, y) {
		super('./images/lamp.png', 100, 200,{
			x1: 36, x2: 60,
			y1: 173, y2: 200,
		});

		this.state = 0;

		// attachDebugBounds(this);

		this.setXY(x,y);
	}

	interact (actor) {
		if (!actor.tool || actor.tool.constructor.name !== 'Axe') {
			dialog("It's just a street lamp.");
		}
		else if (actor.tool.constructor.name === 'Axe') {
			actor.interacting = true;
			this.state = (this.state + 1) % 2;
			css(this.element,{
				transform: this.state ? 'skewX(0.5deg) translateX(-1px)' : '',
			});
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.state = 0;
				css(this.element,{
					transform: ''
				});
			}, 200);
		}
	}
}