import { Sprite } from "../sprite.mjs";
import { attachDebugBounds, css } from "../util.mjs";

const ANIMATION_LOOP = 40;

const wave = [];

// Pre-calculate sine wave for 1 cycle:
for (let i = 0; i < ANIMATION_LOOP; i++) {
	wave.push(Math.sin(Math.PI*i*2/ANIMATION_LOOP) * 3);
}

function selectFrame () {
	return Math.random() > 0.5 ? -150 : -200;
}

export class Water extends Sprite {
	static base = {
		x: 50,
		y: 15,
	}

	constructor (x, y) {
		super('./images/water.png', 100, 50,{
			x1: -50, x2: 150,
			y1: -25, y2: 75,
		}, -100, -50);

		this.cycle = 0;
		this.frameStep = Math.floor(x/10 + y/20) % ANIMATION_LOOP;
		this.frame = selectFrame();
		this.foam = null;

		this.setXY(x,y);
		css(this.element,{
			zIndex: -1,
		});
	}

	animate () {
		this.frameStep = (this.frameStep + 1) % ANIMATION_LOOP;
		if (Math.random() > 0.999) {
			this.frame = selectFrame();
		}

		css(this.foam,{
			backgroundPosition: `${-200 - wave[(this.frameStep + 3) % ANIMATION_LOOP]}px ${this.frame + wave[this.frameStep]}px`,
		});
	}

	action () {
		if (!this.foam) return;

		this.cycle = (this.cycle + 1) % 10;
		if (this.cycle === 0) {
			this.animate();
		}
	}

	adjust (waterItems) {
		let N = false;
		let S = false;
		let W = false;
		let E = false;
		let NW = false;
		let SW = false;
		let NE = false;
		let SE = false;

		for (const i of waterItems) {
			if (i === this) continue;

			if (i instanceof Water) {
				if (i.x === this.x) {
					const diff = i.y - this.y;
					if (diff === 50) {
						S = true;
					}
					else if (diff === -50) {
						N = true;
					}
				}

				if (i.y === this.y) {
					const diff = i.x - this.x;
					if (diff === 100) {
						E = true;
					}
					else if (diff === -100) {
						W = true;
					}
				}

				if (i.x === this.x - 100) {
					const diff = i.y - this.y;
					if (diff === 50) {
						SW = true;
					}
					else if (diff === -50) {
						NW = true;
					}
				}

				if (i.x === this.x + 100) {
					const diff = i.y - this.y;
					if (diff === 50) {
						SE = true;
					}
					else if (diff === -50) {
						NE = true;
					}
				}
			}

			if (N && S && W && E && NE && SE && NW && SW) {
				this.foam = document.createElement('div');
				css(this.foam,{
					position: 'relative',
					top: 0,
					left: 0,
					width: '100px',
					height: '50px',
					backgroundImage: 'url("./images/water.png")',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: `-200px ${this.frame}px`,
				});

				this.element.appendChild(this.foam);

				break;
			}
		}

		if (N && S && W && E) {
			if (!SW) {
				css(this.element,{
					backgroundPosition: '-100px -150px',
				});
				this.bounds.y1 = -25;
				this.bounds.y2 = 25;
				this.bounds.x2 = 50;
			}
			else if (!SE) {
				css(this.element,{
					backgroundPosition: '0px -150px',
				});
				this.bounds.y1 = -25;
				this.bounds.y2 = 25;
				this.bounds.x1 = 50;
			}
			else if (!NW) {
				css(this.element,{
					backgroundPosition: '-100px -200px',
				});
				this.bounds.y1 = 22;
				this.bounds.y2 = 75;
				this.bounds.x2 = 50;
			}
			else if (!NE) {
				css(this.element,{
					backgroundPosition: '0px -200px',
				});
				this.bounds.y1 = 22;
				this.bounds.y2 = 75;
				this.bounds.x1 = 50;
			}
		}
		else if (S && !N && W && E) {
			css(this.element,{
				backgroundPosition: '-100px 0px',
			});
			this.bounds.y1 = 22;
			this.bounds.y2 = 75;
		}
		else if (N && !S && W && E) {
			css(this.element,{
				backgroundPosition: '-100px -100px',
			});
			this.bounds.y1 = -25;
			this.bounds.y2 = 25;
		}
		else if (N && S && !W && E) {
			css(this.element,{
				backgroundPosition: '0px -50px',
			});
			this.bounds.x1 = 50;
		}
		else if (N && S && W && !E) {
			css(this.element,{
				backgroundPosition: '-200px -50px',
			});
			this.bounds.x2 = 50;
		}
		else if (!N && S && !W && E) {
			css(this.element,{
				backgroundPosition: '0px 0px',
			});
			this.bounds.y1 = 22;
			this.bounds.y2 = 75;
			this.bounds.x1 = 50;
		}
		else if (!N && S && W && !E) {
			css(this.element,{
				backgroundPosition: '-200px 0px',
			});
			this.bounds.y1 = 22;
			this.bounds.y2 = 75;
			this.bounds.x2 = 50;
		}
		else if (N && !S && !W && E) {
			css(this.element,{
				backgroundPosition: '0px -100px',
			});
			this.bounds.y1 = -25;
			this.bounds.y2 = 25;
			this.bounds.x1 = 50;
		}
		else if (N && !S && W && !E) {
			css(this.element,{
				backgroundPosition: '-200px -100px',
			});
			this.bounds.y1 = -25;
			this.bounds.y2 = 25;
			this.bounds.x2 = 50;
		}

		// attachDebugBounds(this);
	}
}
