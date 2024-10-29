import { DIAGONAL_MOVEMENT } from "../character.mjs";
import { collisionDetection } from "../collision-detection.mjs";
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
		this.movement = {
			x: 0,
			y: 0,
		}

		this.setXY(x,y);

		// attachDebugBounds(this);
	}

	/**
	 * @param {Character} mover 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} farX 
	 * @param {number} farY 
	 * @param {DIRECTION} direction 
	 * @returns 
	 */
	move (mover, x, y, farX, farY, direction) {
		super.move(mover, x, y, farX, farY, direction);

		this.movement.x = mover.movement.x * 2;
		this.movement.y = mover.movement.y * 2;
	}

	animate () {
		if (this.movement.x || this.movement.y) {
			let dx = this.movement.x;
			let dy = this.movement.y;

			if (dy && dx) {
				dx *= DIAGONAL_MOVEMENT;
				dy *= DIAGONAL_MOVEMENT;
			}


			this.setXY(this.x + dx, this.y + dy);
			this.animateMove();

			const collision = collisionDetection(this);

			if (collision?.x) {
				this.movement.x *= -1;
			}
			if (collision?.y) {
				this.movement.y *= -1;
			}

			this.movement.x *= 0.98;
			if (Math.abs(this.movement.x) < 0.5) this.movement.x = 0;
			this.movement.y *= 0.98;
			if (Math.abs(this.movement.y) < 0.5) this.movement.y = 0;
		}
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

export class Barrel extends Movable {
	static base = {
		x: 25,
		y: 55,
	}

	constructor (x, y) {
		super('./images/barrel.png', 60, 85,{
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


