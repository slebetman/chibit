import { DIRECTION } from "../character.mjs";
import { collisionDetection } from "../collision-detection.mjs";
import { Sprite } from "../sprite.mjs";
import { attachDebugBounds, css } from "../util.mjs";

export class Ball extends Sprite {
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

		this.step = 0;
		this.cycle = 0;
		this.direction = 0;

		// attachDebugBounds(this, 'yellow');
	}

	move (x, y, farX, farY, direction) {
		let newY = this.y;
		let newX = this.x;
		let diffX, diffY;

		this.step = (this.step + 1) % 2;

		css(this.element,{
			backgroundPosition: `${-32 * this.step}px 0px`,
		});

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

		let collided = collisionDetection(this);

		console.log('ball collided:',collided);

		return !collided;
	}
}