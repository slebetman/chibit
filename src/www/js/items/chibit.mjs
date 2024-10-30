import { Character, DIRECTION, DIAGONAL_MOVEMENT, CHARACTER_SIZE } from "../character.mjs";
import { getNearestItems } from "../collision-detection.mjs";
import { Sprite } from "../sprite.mjs";
import { css, $, attachDebugBounds } from "../util.mjs";
import { Axe, Pickaxe } from "./tools.mjs";

const ANIMATION_LOOP = 20;

const wave = [];

// Pre-calculate sine wave for 1 cycle:
for (let i = 0; i < ANIMATION_LOOP; i++) {
	wave.push(Math.sin(Math.PI*i*2/ANIMATION_LOOP) * 3);
}
export class Chibit extends Character {
	static base = {
		x: 49,
		y: 72,
	}

	constructor (x, y) {
		const bounds = {
			x1: 20, x2: 78,
			y1: 60, y2: 84,
		};
		super("./images/character2x8d.png",CHARACTER_SIZE,CHARACTER_SIZE, bounds);
		this.teleportTracker = 0;
		this.ghoseSprite = new Sprite(
			this.spriteSheet,
			this.width,
			this.height,
			bounds
		);
		this.ghostElement = this.ghoseSprite.element;
		this.breathCycle = 0;
		this.frameStep = 0;
		this.interacting = false;
		this.interactingCycle = 0;

		this.tool = new Pickaxe();
		this.element.appendChild(this.tool.element);

		// css(this.element,{
		// 	border: '1px dashed magenta',
		// })

		// attachDebugBounds(this, 'red');
		
		css(this.ghostElement,{
			opacity: '0'
		});

		this.setXY(x,y);
	}

	startInteraction () {
		const nearbyItems = getNearestItems(this, 100);

		// If any of the items can be interacted with, interact with it:
		for (const item of nearbyItems) {
			if (item.interact) {
				// Check if we are facing the item:
				const myCenter = {
					x: this.x + this.constructor.base.x,
					y: this.y + this.constructor.base.y,
				}

				const itemCenter = {
					x: item.x + item.constructor.base.x,
					y: item.y + item.constructor.base.y,
				}

				switch (this.direction) {
					case DIRECTION.N:
					case DIRECTION.NE:
					case DIRECTION.NW:
						if (
							itemCenter.y < myCenter.y &&
							itemCenter.x > this.x &&
							itemCenter.x < this.x + CHARACTER_SIZE
						) {
							item.interact(this);
							return;
						}
						break;
					case DIRECTION.S:
					case DIRECTION.SE:
					case DIRECTION.SW:
						if (
							itemCenter.y > myCenter.y &&
							itemCenter.x > this.x &&
							itemCenter.x < this.x + CHARACTER_SIZE
						) {
							item.interact(this);
							return;
						}
						break;
					case DIRECTION.W:
						if (
							itemCenter.x < myCenter.x &&
							itemCenter.y > this.y &&
							itemCenter.y < this.y + CHARACTER_SIZE
						) {
							item.interact(this);
							return;
						}
						break;
					case DIRECTION.E:
						if (
							itemCenter.x > myCenter.x &&
							itemCenter.y > this.y &&
							itemCenter.y < this.y + CHARACTER_SIZE
						) {
							item.interact(this);
							return;
						}
						break;
				}
			}
		}
	}

	stopInteraction () {
		this.interacting = false;
	}

	teleport () {
		if (this.isMoving()) {
			if (this.teleportTracker === 0) {
				this.teleportTracker = 1
			}
		}
		return this;
	}

	updateTeleport () {
		let d = this.direction * CHARACTER_SIZE;
		let s = this.step * CHARACTER_SIZE;
		css(this.ghostElement,{
			top:  `${this.y}px`,
			left: `${this.x}px`,
			zIndex: Math.floor(this.y + this.bounds.y1),
			backgroundPosition: `-${d}px -${s}px`,
		});
		let opacity = 1;

		let interval = setInterval(() => {
			opacity -= 0.05;

			if (opacity < 0) {
				opacity = 0;
				clearInterval(interval);
				this.teleportTracker = 0;
			}

			css(this.ghostElement, {opacity: opacity});
		},10);

		return this;
	}

	update () {
		super.update();
		css($('world'),{
			top: Math.round(window.innerHeight/2 - this.y - this.constructor.base.y),
			left: Math.round(window.innerWidth/2 - this.x - this.constructor.base.x),
		});
		// css(this.element, {
		// 	zIndex: 9999999,
		// });
	}

	animate () {
		super.animate();
		this.breathe();
		if (this.tool) {
			if (this.interacting) {
				this.interactingCycle = (this.interactingCycle + 1) % 15;

				if (this.interactingCycle === 0) {
					this.tool.state = this.tool.state ? 0 : 1;
					this.tool.update(this);
				}
			}
			else {
				this.tool.state = 0;
				this.tool.update(this);
			}
		}
	}

	breathe () {
		if (!this.isMoving()) {
			this.breathCycle = (this.breathCycle + 1) % 10;

			if(this.breathCycle === 0) {
				this.frameStep = (this.frameStep + 1) % ANIMATION_LOOP;
				const delta = wave[this.frameStep];

				css(this.element,{
					transform: `scaleY(${100+delta}%) translateY(${-delta * 0.35}px)`,
				})
			}
		}
		else {
			this.frameStep = 0;
			css(this.element,{
				transform: 'scaleY(100%) translateY(0)',
			})
		}
	}

	walk () {
		const collided = Character.prototype.walk.call(this);
		if (this.teleportTracker === 1) {
			if (collided) {
				this.teleportTracker = 0;
				return;
			}
			this.teleportTracker = 2;
			this.updateTeleport();
			switch (this.direction) {
				case DIRECTION.E:
					this.x += 150;
					break;
				case DIRECTION.W:
					this.x -= 150;
					break;
				case DIRECTION.S:
					this.y += 150;
					break;
				case DIRECTION.N:
					this.y -= 150;
					break;
				case DIRECTION.NE:
					this.x += 150 * DIAGONAL_MOVEMENT;
					this.y -= 150 * DIAGONAL_MOVEMENT;
					break;
				case DIRECTION.NW:
					this.x -= 150 * DIAGONAL_MOVEMENT;
					this.y -= 150 * DIAGONAL_MOVEMENT;
					break;
				case DIRECTION.SE:
					this.x += 150 * DIAGONAL_MOVEMENT;
					this.y += 150 * DIAGONAL_MOVEMENT;
					break;
				case DIRECTION.SW:
					this.x -= 150 * DIAGONAL_MOVEMENT;
					this.y += 150 * DIAGONAL_MOVEMENT;
					break;
			}
			this.update();
		}
		return collided;
	}
}