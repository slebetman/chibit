import { Movable } from "../movable.mjs";
import { attachDebugBounds, css } from "../util.mjs";

export class Ball extends Movable {
	static base = {
		x: 17,
		y: 24,
	}

	constructor (x, y) {
		super('./images/ball.png', 32, 32,{
			x1: 1, x2: 28,
			y1: 8, y2: 28,
		});
		this.setXY(x,y);
	}

	animateMove () {
		this.step = (this.step + 1) % 2;

		css(this.element,{
			backgroundPosition: `${-32 * this.step}px 0px`,
		});
	}
}
export class Box1 extends Movable {
	static base = {
		x: 32,
		y: 70,
	}

	constructor (x, y) {
		super('./images/box1.png', 75, 100,{
			x1: 0, x2: 64,
			y1: 40, y2: 91,
		});
		this.setXY(x,y);

		// attachDebugBounds(this, 'yellow');
	}
}

export class Box2 extends Movable {
	static base = {
		x: 25,
		y: 60,
	}

	constructor (x, y) {
		super('./images/box2.png', 60, 85,{
			x1: 0, x2: 50,
			y1: 40, y2: 77,
		});
		this.setXY(x,y);

		// css(this.element,{
		// 	border: '1px dashed orange',
		// })

		// attachDebugBounds(this, 'yellow');
	}
}

