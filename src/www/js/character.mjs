import { collisionDetection } from "./collision-detection.mjs";
import { Sprite } from "./sprite.mjs";
import { css, $ } from "./util.mjs";

export const DIRECTION = {
	S: 0,
	SW: 1,
	W: 2,
	NW: 3,
	N: 4,
	NE: 5,
	E: 6,
	SE: 7,
}

let nextId = 0;

export const DIAGONAL_MOVEMENT = Math.cos(Math.PI/4);
export class Character extends Sprite {
	/**
	 * @param {string} spritesheet 
	 * @param {number} width 
	 * @param {number} height 
	 * @param {import("./sprite.mjs").Bounds} bounds 
	 */
	constructor (spritesheet, width, height, bounds) {
		super(spritesheet, width, height, bounds);
		this.direction = 0;
		this.step = 0;
		this.cycle = 0;
		this.stepsize = 2;
		this.movement = {
			x: 0,
			y: 0,
		}
	}

	stopHorizontalMovement () {
		this.movement.x = 0;

		if (this.movement.y === 0) {
			this.step = 0;
			this.update();
		}

		return this;
	}

	stopVerticalMovement () {
		this.movement.y = 0;

		if (this.movement.x === 0) {
			this.step = 0;
			this.update();
		}

		return this;
	}

	moveLeft () {
		this.movement.x = -this.stepsize;
		return this;
	}

	moveRight () {
		this.movement.x = this.stepsize;
		return this;
	}

	moveUp () {
		this.movement.y = -this.stepsize;
		return this;
	}

	moveDown () {
		this.movement.y = this.stepsize;
		return this;
	}

	isMoving () {
		return this.movement.x !== 0 || this.movement.y !== 0;
	}

	update () {
		let d = this.direction * 96;
		let s = this.step * 96;
		css(this.element,{
			top:  `${this.y}px`,
			left: `${this.x}px`,
			zIndex: Math.floor(this.y + this.bounds.y1),
			backgroundPosition: `-${d}px -${s}px`,
		});

		if (this.tool) {
			css(this.tool.element,{
				zIndex: Math.floor(this.y + this.bounds.y1) + 1,
				backgroundPosition: `-${d}px -${s}px`,
			});
		}

		return this;
	}

	animate () {
		this.walk();
	}

	walk () {
		let collided = false;
		if (this.isMoving()) {
			if (this.movement.y < 0) {
				if (this.movement.x > 0) {
					this.direction = DIRECTION.NE;
				}
				else if (this.movement.x < 0) {
					this.direction = DIRECTION.NW;
				}
				else {
					this.direction = DIRECTION.N;
				}
			}
			else if (this.movement.y > 0) {
				if (this.movement.x > 0) {
					this.direction = DIRECTION.SE;
				}
				else if (this.movement.x < 0) {
					this.direction = DIRECTION.SW;
				}
				else {
					this.direction = DIRECTION.S;
				}
			}
			else if (this.movement.x > 0) {
				this.direction = DIRECTION.E;
			}
			else if (this.movement.x < 0) {
				this.direction = DIRECTION.W;
			}
			else {
				this.direction = DIRECTION.S;
			}

			if (this.movement.x !== 0 && this.movement.y !== 0) {
				this.x += this.movement.x * DIAGONAL_MOVEMENT;
				this.y += this.movement.y * DIAGONAL_MOVEMENT;
			}
			else {
				this.x += this.movement.x;
				this.y += this.movement.y;
			}

			collided = collisionDetection(this);

			this.cycle = (this.cycle+1)%6;
			if (this.cycle === 0) {
				this.step = (this.step + 1) % 4;
			}
			this.update();
		}

		return collided;
	}
}