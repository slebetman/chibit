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

// const treesSprites2 = [
// 	[0, 0], [-240, 0], [-240, -320], [-480, 0], [-480, -320],
// 	[0, -320], [-240, -320], [-240, 0], [-480, -320], [-480, 0],
// ]

const treesSprites2 = [
	[0, 0], [-240, 0], [-480, 0], [-240, 0], [-480, 0],
]

export class Trees2 extends Sprite {
	static base = {
		x: 120,
		y: 275,
	}

	constructor (x, y) {
		idx = (idx + 1) % treesSprites2.length;
		const [offsetX, offsetY] = treesSprites2[idx];

		super('./images/trees2.png', 240, 320,{
			x1: 100, x2: 140,
			y1: 265, y2: 290,
		}, offsetX, offsetY);
		this.setXY(x,y);

		// attachDebugBounds(this);
	}
}

const treesSprites3 = [
	[0, 0], [-240, 0], [-240, -320], [-480, 0], [-480, -320],
	[0, -320], [-240, -320], [-240, 0], [-480, -320], [-480, 0],
]

export class Trees3 extends Sprite {
	static base = {
		x: 120,
		y: 275,
	}

	constructor (x, y) {
		idx = (idx + 1) % treesSprites3.length;
		const [offsetX, offsetY] = treesSprites3[idx];

		super('./images/trees3.png', 240, 320,{
			x1: 105, x2: 135,
			y1: 260, y2: 275,
		}, offsetX, offsetY);
		this.setXY(x,y);

		// attachDebugBounds(this);
	}
}