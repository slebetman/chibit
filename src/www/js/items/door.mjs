import { Character } from "../lib/character.mjs";
import { collide } from "../lib/collision-detection.mjs";
import { Sprite } from "../lib/sprite.mjs";
import { attachDebugBounds, css } from "../lib/util.mjs";

export class Door extends Sprite {
	static base = {
		x: 50,
		y: 60,
	}

	constructor (x, y, state = 'closed') {
		super('./images/door2.png', 100, 100,{
			x1: 0, x2: 100,
			y1: 50, y2: 70,
		}, 0, 0);

		this.open = state === 'open' ? true : false;

		// css(this.element,{
		// 	opacity: 0.5,
		// })

		// attachDebugBounds(this);

		this.setXY(x,y);
	}

	/**
	 * @param {Character} actor 
	 */
	interact (actor) {
		this.open = !this.open;

		this.update();

		if (!this.open) {
			// Check if we can close the door:
			const collision = collide(actor, this, actor.direction);

			if (collision) {
				this.open = true;
				this.update();
			}
		}
	}

	update () {
		css(this.element,{
			backgroundPosition: this.open ? `-100px 0` : '0 0',
		});

		if (this.open) {
			this.bounds = {
				x1: 0, x2: 0,
				y1:0 , y2: 0,
			}
		}
		else {
			this.bounds = {
				x1: 0, x2: 100,
				y1: 50, y2: 70,
			}
		}
	}
}

export class SidewaysDoor extends Sprite {
	static base = {
		x: 50,
		y: 65,
	}

	constructor (x, y, state = 'closed') {
		super('./images/door2.png', 100, 150,{
			x1: 44, x2: 56,
			y1: 0, y2: 200,
		}, 0, -100);

		this.open = state === 'open' ? true : false;

		// css(this.element,{
		// 	opacity: 0.5,
		// })

		// attachDebugBounds(this);

		this.setXY(x,y);
	}

	/**
	 * @param {Character} actor 
	 */
	interact (actor) {
		this.open = !this.open;

		this.update();

		if (!this.open) {
			// Check if we can close the door:
			const collision = collide(actor, this, actor.direction);

			if (collision) {
				this.open = true;
				this.update();
			}
		}
	}

	update () {
		css(this.element,{
			backgroundPosition: this.open ? `-100px -100px` : '0 -100px',
		});

		if (this.open) {
			this.bounds = {
				x1: 0, x2: 0,
				y1:0 , y2: 0,
			}
		}
		else {
			this.bounds = {
				x1: 48, x2: 52,
				y1: 0, y2: 200,
			}
		}
	}
}