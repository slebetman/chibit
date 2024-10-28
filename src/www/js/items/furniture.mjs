import { Sprite } from "../sprite.mjs";
import { attachDebugBounds, css } from "../util.mjs";

let shelfIdx = 0;
const shelfSprites = [0, 100, 200, 300, 400, 500, 600, 700];
export class Shelf extends Sprite {
	static base = {
		x: 50,
		y: 60,
	}

	constructor (x, y) {
		shelfIdx = (shelfIdx + 1) % shelfSprites.length;
		const offsetX = shelfSprites[shelfIdx];

		super('./images/shelves.png', 100, 110,{
			x1: 0, x2: 100,
			y1: 20, y2: 100,
		}, -offsetX, 0);
		this.setXY(x,y);
	}
}

export class MonitorDesk extends Sprite {
	static base = {
		x: 40,
		y: 60,
	}

	constructor (x, y) {
		super('./images/monitor-desk.png', 80, 80,{
			x1: 10, x2: 70,
			y1: 35, y2: 75,
		});
		this.setXY(x,y);
	}
}

export class MonitorDeskBig extends Sprite {
	static base = {
		x: 90,
		y: 60,
	}

	constructor (x, y) {
		super('./images/monitor-desk-big.png', 180, 80,{
			x1: 10, x2: 170,
			y1: 20, y2: 80,
		});
		this.setXY(x,y);
	}
}

export class Machine1 extends Sprite {
	static base = {
		x: 125,
		y: 70,
	}

	constructor (x, y) {
		super('./images/machine1.png', 250, 100,{
			x1: 10, x2: 240,
			y1: 20, y2: 90,
		});
		this.cycle = 0;
		this.setXY(x,y);
	}

	animate () {
		this.cycle = (this.cycle + 1) % 4;
		if (this.cycle === 0) {
			const amount = (Math.random() * 1.5) - 0.75;

			css(this.element,{
				transform: `skewX(${amount}deg) translateX(${amount * -1.1}px)`,
			})
		}
	}
}

export class DinoBones extends Sprite {
	static base = {
		x: 130,
		y: 80,
	}

	constructor (x, y) {
		super('./images/dino-bones.png', 260, 150,{
			x1: 20, x2: 240,
			y1: 15, y2: 120,
		});
		this.setXY(x,y);

		// attachDebugBounds(this, 'green');
	}
}