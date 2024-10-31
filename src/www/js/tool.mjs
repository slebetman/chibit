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
		super(spriteSheet, CHARACTER_SIZE, 70,{
			x1: 0, x2: 0,
			y1: 0, y2: 0,
		});

		this.state = 0;
		this.spriteSheet = spriteSheet;

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