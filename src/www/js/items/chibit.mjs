import { Character, DIRECTION, DIAGONAL_MOVEMENT } from "../character.mjs";
import { Sprite } from "../sprite.mjs";
import { css, $, attachDebugBounds } from "../util.mjs";

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
		super("./images/character2x8d.png",96,96, bounds);
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

		// css(this.element,{
		// 	border: '1px dashed magenta',
		// })

		// attachDebugBounds(this, 'red');
		
		css(this.ghostElement,{
			opacity: '0'
		});

		this.setXY(x,y);
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
		let d = this.direction * 96;
		let s = this.step * 96;
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
			top: Math.round(-this.y + window.innerHeight/2),
			left: Math.round(-this.x + window.innerWidth/2),
		});
		// css(this.element, {
		// 	zIndex: 9999999,
		// });
	}

	action () {
		super.action();
		this.breathe();
	}

	breathe () {
		if (!this.isMoving()) {
			this.breathCycle = (this.breathCycle + 1) % 10;

			if(this.breathCycle === 0) {
				console.log('taking a breath');
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