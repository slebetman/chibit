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

const treesSprites = [
	[0, 0], [-200, 0], [-400, 0],
	[0, -300], [-200, -300], [-400, -300]
]

export class Trees extends Sprite {
	static base = {
		x: 100,
		y: 260,
	}

	constructor (x, y) {
		idx = (idx + 1) % treesSprites.length;
		const [offsetX, offsetY] = treesSprites[idx];

		super('./images/trees.png', 200, 300,{
			x1: 20, x2: 180,
			y1: 230, y2: 280,
		}, offsetX, offsetY);
		this.setXY(x,y);

		// attachDebugBounds(this);
	}
}