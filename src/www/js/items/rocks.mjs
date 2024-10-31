import { dialog } from "../dialog.mjs";
import { Sprite } from "../sprite.mjs";
import { attachDebugBounds, attachDebugCenter, css } from "../util.mjs";

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
		const idx = (Math.floor(x*13/100) + Math.floor(y/50) + 2) % rockSprites.length;
		const [offsetX, offsetY] = rockSprites[idx];

		super('./images/rocks.png', 100, 100,{
			x1: 15, x2: 85,
			y1: 38, y2: 88,
		}, offsetX, offsetY);

		this.state = 0;
		this.timeout = null;

		// attachDebugBounds(this, 'magenta');
		// attachDebugCenter(this);
		
		this.setXY(x,y);
	}

	interact (actor) {
		if (!actor.tool) {
			dialog('I need tools to mine this.');
		}
		else if (actor.tool.constructor.name === 'Pickaxe') {
			if (actor.interacting) {
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
			actor.interacting = true;
		}
	}
}