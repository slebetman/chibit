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
		this.teleportTracker = 0;
		this.characterElement = document.createElement('div');
		this.characterElement.id = nextId++;
		css(this.characterElement,{
			backgroundImage: `url("${spritesheet}")`,
			backgroundRepeat: 'no-repeat',
			display: 'block',
			position: 'absolute',
			width: width,
			height: height,
			backgroundPosition: '0px 0px',
		})
		document.body.appendChild(this.characterElement);
		this.ghostElement = document.createElement('div');
		this.ghostElement.id = nextId++;
		css(this.ghostElement,{
			backgroundImage: `url("${spritesheet}")`,
			backgroundRepeat: 'no-repeat',
			display: 'block',
			position: 'absolute',
			width: `${width}px`,
			height: `${height}px`,
			backgroundPosition: '0px 0px',
			opacity: '0'
		})
		document.body.appendChild(this.ghostElement);
	}

	teleport () {
		if (this.teleportTracker === 0) {
			this.teleportTracker = 1
		}
		return this;
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

	updateTeleport () {
		let d = this.direction * 96;
		let s = this.step * 96;
		css(this.ghostElement,{
			top:  `${this.y}px`,
			left: `${this.x}px`,
			backgroundPosition: `-${d}px -${s}px`,
		});
		let opacity = 0.6;

		let interval = setInterval(() => {
			opacity -= 0.01;

			if (opacity < 0) {
				opacity = 0;
				clearInterval(interval);
				this.teleportTracker = 0;
			}

			css(this.ghostElement, {opacity: opacity});
		},30);

		return this;
	}

	checkDirection (directions) {
		return directions.find(i=>i===this.direction) !== undefined;
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

			this.x += this.movement.x;
			this.y += this.movement.y;

			this.cycle = (this.cycle+1)%6;
			if (this.cycle === 0) {
				this.step = (this.step + 1) % 4;
			}
			this.update();
		}
		if (this.teleportTracker === 1) {
			this.teleportTracker = 2;
			this.updateTeleport();
			if (this.checkDirection([DIRECTION.E,DIRECTION.NE,DIRECTION.SE])) {
				this.x += 150;
			}
			if (this.checkDirection([DIRECTION.W,DIRECTION.NW,DIRECTION.SW])) {
				this.x -= 150;
			}
			if (this.checkDirection([DIRECTION.S,DIRECTION.SW,DIRECTION.SE])) {
				this.y += 150;
			}
			if (this.checkDirection([DIRECTION.N,DIRECTION.NW,DIRECTION.NE])) {
				this.y -= 150;
			}
			this.update();
		}
		return this;
	}
}