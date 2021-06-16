class Chibit extends Character {
	constructor () {
		super("./character2x8d.png",96,96);
		this.teleportTracker = 0;
		this.ghostElement = document.createElement('div');
		this.ghostElement.id = nextId++;
		css(this.ghostElement,{
			backgroundImage: `url("${this.spriteSheet}")`,
			backgroundRepeat: 'no-repeat',
			display: 'block',
			position: 'absolute',
			width: `${this.spriteWidth}px`,
			height: `${this.spriteHeight}px`,
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

	updateTeleport () {
		let d = this.direction * 96;
		let s = this.step * 96;
		css(this.ghostElement,{
			top:  `${this.y}px`,
			left: `${this.x}px`,
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

	walk () {
		Character.prototype.walk.call(this);
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