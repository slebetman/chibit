import { Sprite } from "./sprite.mjs";
import { attachDebugBounds, css } from "./util.mjs";
import { Character, CHARACTER_SIZE } from "./character.mjs";
import { dialog } from "./dialog.mjs";
import { Chibit } from "./items/chibit.mjs";

export class Tool extends Sprite {
	/**
	 * @param {string} spriteSheet 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} offsetX 
	 * @param {number} offsetY 
	 */
	constructor (spriteSheet) {
		super(spriteSheet, CHARACTER_SIZE, 70,{
			x1: 0, x2: 50,
			y1: 0, y2: 50,
		});

		this.state = 0;
		this.spriteSheet = spriteSheet;

		/** @type {DroppedTool | null} */
		this.dropped = null;

		this.element.className = 'tool';

		css(this.element,{
			position: 'relative',
			top: '25px',
			left: 0,
		});
	}

	/**
	 * @param {Character} actor 
	 */
	update (actor) {
		css(this.element,{
			backgroundPosition: `${actor.direction * -CHARACTER_SIZE}px ${this.state * -70 - 50}px`,
		});
	}
}

export class DroppedTool extends Sprite {
	static base = {
		x: 25,
		y: 25,
	}

	/**
	 * @param {string} spriteSheet 
	 * @param {number} x 
	 * @param {number}} y 
	 * @param {Tool} item 
	 */
	constructor (spriteSheet, x, y, item) {
		super(spriteSheet, 50, 50,{
			x1: 24, x2: 26,
			y1: 24, y2: 26,
		}, -50, 0);

		this.item = item;
		this.item.dropped = this;

		this.setXY(x,y);
	}

	/**
	 * @param {Chibit} actor 
	 */
	interact (actor) {
		actor.pickupItem(this);
	}

	adjust () {
		this.bounds = {
			x1: 0, x2: 0,
			y1: 0, y2: 0,
		}

		// attachDebugBounds(this);
	}
}