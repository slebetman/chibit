import { DIRECTION } from "../character.mjs";
import { collisionDetection } from "../collision-detection.mjs";
import { Sprite } from "../sprite.mjs";
import { attachDebugBounds, css } from "../util.mjs";

export class Movable extends Sprite {
	constructor (spriteSheet, width, height, bounds) {
		super(spriteSheet, width, height,bounds);

		this.step = 0;
		this.cycle = 0;
		this.direction = 0;
	}

	move (mover, x, y, farX, farY, direction) {
		let newY = this.y;
		let newX = this.x;
		let diffX, diffY;

		this.animateMove?.();

		switch (direction) {
			case DIRECTION.N:
				newY = y - this.bounds.y2;
				break;
			case DIRECTION.S:
				newY = farY - this.bounds.y1;
				break;
			case DIRECTION.E:
				newX = farX - this.bounds.x1;
				break;
			case DIRECTION.W:
				newX = x - this.bounds.x2;
				break;
			case DIRECTION.NE:
				newY = y - this.bounds.y2;
				newX = farX - this.bounds.x1;

				diffY = Math.abs(this.y - newY);
				diffX = Math.abs(this.x - newX);

				if (diffX < diffY) {
					newY = this.y - diffX;
				}
				else {
					newX = this.x + diffY;
				}
				break;
			case DIRECTION.SE:
				newY = farY - this.bounds.y1;
				newX = farX - this.bounds.x1;

				diffY = Math.abs(this.y - newY);
				diffX = Math.abs(this.x - newX);

				if (diffX < diffY) {
					newY = this.y + diffX;
				}
				else {
					newX = this.x + diffY;
				}
				break;
			case DIRECTION.NW:
				newY = y - this.bounds.y2;
				newX = x - this.bounds.x2;

				diffY = Math.abs(this.y - newY);
				diffX = Math.abs(this.x - newX);

				if (diffX < diffY) {
					newY = this.y - diffX;
				}
				else {
					newX = this.x - diffY;
				}
				break;
			case DIRECTION.SW:
				newY = farY - this.bounds.y1;
				newX = x - this.bounds.x2;

				diffY = Math.abs(this.y - newY);
				diffX = Math.abs(this.x - newX);

				if (diffX < diffY) {
					newY = this.y + diffX;
				}
				else {
					newX = this.x - diffY;
				}
				break;
		}

		this.direction = direction;
		this.setXY(newX, newY);

		let collided = collisionDetection(this, [ mover ]);

		return !collided;
	}
}

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

