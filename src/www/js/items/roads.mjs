import { Sprite } from "../lib/sprite.mjs";
import { css } from "../lib/util.mjs";
import { Floor } from "./floor.mjs";

export class Road extends Floor {
	constructor (sprite, x, y, offsetX = 0, offsetY = 0) {
		super(sprite, x, y, offsetX, offsetY);
		css(this.element,{
			zIndex: -2,
		});
	}
}
export class StonePath extends Road {
	constructor (x, y) {
		super('./images/path-light.png', x, y, 0, 0);
	}

	adjust (pathItems) {
		let top = false;
		let bottom = false;
		let left = false;
		let right = false;

		for (const i of pathItems) {
			if (i === this) continue;

			if (i instanceof StonePath) {
				if (i.x === this.x) {
					const diff = i.y - this.y;
					if (diff === 50) {
						bottom = true;
					}
					else if (diff === -50) {
						top = true;
					}
				}

				if (i.y === this.y) {
					const diff = i.x - this.x;
					if (diff === 100) {
						right = true;
					}
					else if (diff === -100) {
						left = true;
					}
				}
			}

			if (top && bottom && left && right) return;
		}

		if (top && left && !bottom && !right) {
			css(this.element,{
				backgroundPosition: '0 -50px',
			});
		}
		else if (top && right && !bottom && !left) {
			css(this.element,{
				backgroundPosition: '0 -100px',
			});
		}
		else if (bottom && left && !top && !right) {
			css(this.element,{
				backgroundPosition: '0 -150px',
			});
		}
		else if (bottom && right && !top && !left) {
			css(this.element,{
				backgroundPosition: '0 -200px',
			});
		}
	}
}

export class CobblePath extends Sprite {
	static base = {
		x: 60,
		y: 20,
	}

	constructor (x, y) {
		super('./images/path-cobble.png', 120, 70,{
			x1: 0, x2: 0,
			y1: 0, y2: 0,
		}, 0, 0);
		this.setXY(x,y);
		css(this.element,{
			zIndex: -2,
		});
	}

	adjust (pathItems) {
		let top = false;
		let bottom = false;
		let left = false;
		let right = false;

		for (const i of pathItems) {
			if (i === this) continue;

			if (i instanceof CobblePath) {
				if (i.x === this.x) {
					const diff = i.y - this.y;
					if (diff === 50) {
						bottom = true;
					}
					else if (diff === -50) {
						top = true;
					}
				}

				if (i.y === this.y) {
					const diff = i.x - this.x;
					if (diff === 100) {
						right = true;
					}
					else if (diff === -100) {
						left = true;
					}
				}
			}
		}

		if (bottom && !top && !left && !right) {
			css(this.element,{
				backgroundPosition: '-120 -140px',
			});
		}
		else if (top && bottom && left) {
			css(this.element,{
				backgroundPosition: '-120 0px',
			});
		}
		else if (top && bottom && !left) {
			css(this.element,{
				backgroundPosition: '-240 0px',
			});
		}
		else if (top && left && !bottom && !right) {
			css(this.element,{
				backgroundPosition: '-240 -70px',
			});
		}
		else if (top && right && !bottom && !left) {
			css(this.element,{
				backgroundPosition: '0 -70px',
			});
		}
		else if (bottom && left && !top && !right) {
			css(this.element,{
				backgroundPosition: '0 -140px',
			});
		}
		else if (bottom && right && !top && !left) {
			css(this.element,{
				backgroundPosition: '-120 -70px',
			});
		}
	}
}

let alternate = false;

export class DirtPath extends Sprite {
	static base = {
		x: 50,
		y: 13,
	}

	constructor (x, y) {
		super('./images/path-dirt2.png', 100, 50,{
			x1: 0, x2: 0,
			y1: 0, y2: 0,
		}, -100, 0);
		this.setXY(x,y);
		css(this.element,{
			zIndex: -2,
		});
	}

	adjust (pathItems) {
		let top = false;
		let bottom = false;
		let left = false;
		let right = false;

		alternate = Math.random() > 0.5 ? true : false;

		for (const i of pathItems) {
			if (i === this) continue;

			if (i instanceof DirtPath) {
				if (i.x === this.x) {
					const diff = i.y - this.y;
					if (diff === 50) {
						bottom = true;
					}
					else if (diff === -50) {
						top = true;
					}
				}

				if (i.y === this.y) {
					const diff = i.x - this.x;
					if (diff === 100) {
						right = true;
					}
					else if (diff === -100) {
						left = true;
					}
				}
			}
		}

		if (top && bottom && left && right) {
			css(this.element,{
				backgroundPosition: '-100px -50px',
			});
		}
		else if (!top && bottom && left && right) {
			css(this.element,{
				backgroundPosition: '0px 0px',
			});
		}
		else if (!top && !bottom && left && right) {
			css(this.element,{
				backgroundPosition: alternate ? '0px -50px' : '0px -100px',
			});
		}
		else if (top && !bottom && left && !right) {
			css(this.element,{
				backgroundPosition: '0px -150px',
			});
		}
		else if (!top && bottom && left && !right) {
			css(this.element,{
				backgroundPosition: '-100px -100px',
			});
		}
		else if (top && !bottom && !left && right) {
			css(this.element,{
				backgroundPosition: '-100px -150px',
			});
		}
		else if (top && !bottom && left && right) {
			css(this.element,{
				backgroundPosition: '-200px 0px',
			});
		}
		else if (!top && bottom && !left && right) {
			css(this.element,{
				backgroundPosition: '-200px -100px',
			});
		}
		else if (top && bottom && !left && right) {
			css(this.element,{
				backgroundPosition: '0px -200px',
			});
		}
		else if (top && bottom && left && !right) {
			css(this.element,{
				backgroundPosition: '-100px -200px',
			});
		}
		else if (!top && !bottom && left && !right) {
			css(this.element,{
				backgroundPosition: '-100px -250px',
			});
		}
		else if (!top && !bottom && !left && right) {
			css(this.element,{
				backgroundPosition: '0px -250px',
			});
		}
		else if (!top && bottom && !left && !right) {
			css(this.element,{
				backgroundPosition: '-200px -200px',
			});
		}
		else if (top && !bottom && !left && !right) {
			css(this.element,{
				backgroundPosition: '-200px -250px',
			});
		}
		else if (alternate) {
			css(this.element,{
				backgroundPosition: '-200px -150px',
			});
		}
	}
}
