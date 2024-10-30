import { Sprite } from "./sprite.mjs";
import { css } from "./util.mjs";
import { Character, CHARACTER_SIZE, DIRECTION } from "./character.mjs";

export class Tool extends Sprite {
	/**
	 * @param {string} spriteSheet 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} offsetX 
	 * @param {number} offsetY 
	 */
	constructor (spriteSheet) {
		super(spriteSheet, CHARACTER_SIZE, CHARACTER_SIZE,{
			x1: 0, x2: 0,
			y1: 0, y2: 0,
		});

		this.state = 0;

		css(this.element,{
			position: 'relative',
			top: 0,
			left: 0,
		});
	}

	/**
	 * @param {Character} actor 
	 */
	update (actor) {
		css(this.element,{
			backgroundPosition: `${actor.direction * -CHARACTER_SIZE}px ${this.state * -CHARACTER_SIZE}px`,
		});
	}
}