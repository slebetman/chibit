import { DIRECTION } from "./character.mjs";
import { collisionDetection } from "./collision-detection.mjs";
import { Sprite } from "./sprite.mjs";

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