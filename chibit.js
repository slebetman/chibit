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
		return this;
	}
}