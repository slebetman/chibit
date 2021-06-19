const DIRECTION = {
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

const DIAGONAL_MOVEMENT = Math.cos(Math.PI/4);
class Character {
	constructor (spritesheet,width,height) {
		this.direction = 0;
		this.x = 0;
		this.y = 0;
		this.step = 0;
		this.cycle = 0;
		this.stepsize = 2;
		this.movement = {
			x: 0,
			y: 0,
		}
		this.spriteSheet = spritesheet;
		this.spriteWidth = width;
		this.spriteHeight = height;
		this.characterElement = document.createElement('div');
		this.characterElement.id = nextId++;
		css(this.characterElement,{
			backgroundImage: `url("${this.spriteSheet}")`,
			backgroundRepeat: 'no-repeat',
			display: 'block',
			position: 'absolute',
			width: `${this.spriteWidth}px`,
			height: `${this.spriteHeight}px`,
			backgroundPosition: '0px 0px',
		})
		document.body.appendChild(this.characterElement);
	}

	stopHorizontalMovement () {
		this.movement.x = 0;
		return this;
	}

	stopVerticalMovement () {
		this.movement.y = 0;
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

	setXY (x,y) {
		this.x = x;
		this.y = y;
		return this;
	}

	update () {
		let d = this.direction * 96;
		let s = this.step * 96;
		css(this.characterElement,{
			top:  `${this.y}px`,
			left: `${this.x}px`,
			backgroundPosition: `-${d}px -${s}px`,
		});

		return this;
	}

	walk () {
		if (this.movement.x || this.movement.y) {
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

			if (this.movement.x != 0 && this.movement.y != 0) {
				this.x += this.movement.x * DIAGONAL_MOVEMENT;
				this.y += this.movement.y * DIAGONAL_MOVEMENT;
			}
			else {
				this.x += this.movement.x;
				this.y += this.movement.y;
			}

			this.cycle = (this.cycle+1)%6;
			if (this.cycle === 0) {
				this.step = (this.step + 1) % 4;
			}
			this.update();
		}
		return this;
	}
}