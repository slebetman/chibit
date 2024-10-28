import { Sprite } from "../sprite.mjs";
import { css } from "../util.mjs";

const animationFrame = [
	[0, 0], [-50, 0], [-100, 0], [-150, 0], [-200, 0], [-250, 0],
	[0, -72], [-50, -72], [-100, -72], [-150, -72], [-200, -72], [-250, -72],
	[0, -144], [-50, -144], [-100, -144], [-150, -144], [-200, -144], [-250, -144],
]

export class CampFire extends Sprite {
	static base = {
		x: 25,
		y: 60,
	}

	constructor (x, y) {
		super('./images/campfire.png', 50, 72,{
			x1: 5, x2: 45,
			y1: 35, y2: 72,
		});

		this.cycle = 0;
		this.frame = 0;

		this.setXY(x,y);
	}

	animate () {
		this.cycle = (this.cycle + 1) % 5;
		if (this.cycle === 0) {
			this.frame = (this.frame + 1) % animationFrame.length;

			const [dx, dy] = animationFrame[this.frame];

			css(this.element, {
				backgroundPosition: `${dx}px ${dy}px`,
			})
		}
	}
}