import { css, $ } from "./util.mjs";

let nextId = 0;

export function getNextId () {
	return `item${nextId++}`;
}

/**
 * @typedef {Object} Bounds
 * @property x1
 * @property y1
 * @property x2
 * @property y2
 */

export class Sprite {
	/**
	 * @param {string} spritesheet 
	 * @param {number} width 
	 * @param {number} height 
	 * @param {Bounds} bounds
	 * @param {number} offsetX 
	 * @param {number} offsetY 
	 */
	constructor (spritesheet, width, height, bounds, offsetX = 0, offsetY = 0) {
		this.x = 0;
		this.y = 0;
		this.spriteSheet = spritesheet;
		this.width = width;
		this.height = height;
		this.bounds = bounds;
		this.element = document.createElement('div');
		this.element.id = getNextId();
		css(this.element,{
			backgroundImage: `url("${this.spriteSheet}")`,
			backgroundRepeat: 'no-repeat',
			display: 'block',
			position: 'absolute',
			width: `${this.width}px`,
			height: `${this.height}px`,
			backgroundPosition: `${offsetX}px ${offsetY}px`,
		})
		document.body.appendChild(this.element);
	}

	setXY (x,y) {
		this.x = x;
		this.y = y;
		css(this.element,{
			top:  `${this.y}px`,
			left: `${this.x}px`,
			zIndex: Math.floor(this.y),
		});
		return this;
	}
}