import { dialog } from "../dialog.mjs";
import { Sprite } from "../sprite.mjs";
import { attachDebugBounds, css } from "../util.mjs";

export class Tree1 extends Sprite {
	static base = {
		x: 130,
		y: 275,
	}

	constructor (x, y) {
		super('./images/tree1.png', 260, 320,{
			x1: 120, x2: 160,
			y1: 250, y2: 290,
		});
		this.setXY(x,y);

		// attachDebugBounds(this);
	}
}

let idx = 0;

const treesSprites3 = [
	[0, 0], [-240, 0], [-240, -320], [-480, 0], [-480, -320],
	[0, -320], [-240, -320], [-240, 0], [-480, -320], [-480, 0],
]

export class Trees extends Sprite {
	static base = {
		x: 120,
		y: 275,
	}

	constructor (x, y) {
		idx = (idx + 1) % treesSprites3.length;
		const [offsetX, offsetY] = treesSprites3[idx];

		super('./images/trees3.png', 240, 320,{
			x1: 108, x2: 132,
			y1: 265, y2: 280,
		}, offsetX, offsetY);

		this.state = 0;

		this.setXY(x,y);

		// attachDebugBounds(this, 'cyan');
	}

	interact (actor) {
		if (!actor.tool) {
			dialog('I need tools to chop this down.');
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

const bushSprites = [
	[0, 0], [0, -100], [-100, 0], [-100, -100],
]

export class Bushes extends Sprite {
	static base = {
		x: 48,
		y: 65,
	}

	constructor (x, y) {
		idx = (idx + 1) % bushSprites.length;
		const [offsetX, offsetY] = bushSprites[idx];

		super('./images/bushes.png', 100, 100,{
			x1: 35, x2: 65,
			y1: 50, y2: 70,
		}, offsetX, offsetY);
		this.setXY(x,y);

		// attachDebugBounds(this);
	}

	interact () {
		dialog("There's nothing here.")
	}
}