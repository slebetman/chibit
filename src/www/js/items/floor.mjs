import { Sprite } from "../sprite.mjs";
import { css } from "../util.mjs";

class Floor extends Sprite {
	static base = {
		x: 50,
		y: 15,
	}

	/**
	 * @param {string} spriteSheet 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} offsetX 
	 * @param {number} offsetY 
	 */
	constructor (spriteSheet, x, y, offsetX = 0, offsetY = 0) {
		super(spriteSheet, 100, 50,{
			x1: 0, x2: 0,
			y1: 0, y2: 0,
		}, offsetX, offsetY);
		this.setXY(x,y);
		css(this.element,{
			zIndex: -1,
		})
	}
}

export class WoodFloor extends Floor {
	constructor (x, y) {
		super('./images/floor-wood.png', x, y);
	}
}

export class StoneFloor extends Floor {
	constructor (x, y) {
		super('./images/floor-stone.png', x, y);
	}
}

export class TileFloor extends Floor {
	constructor (x, y) {
		super('./images/floor-tile.png', x, y);
	}
}

/*
	Path logic:

	above

	  .|. = |

	   .
	  ||. = ^\

	   |
	  ||. = |

	   .
	  .|| = /^

	   |
	  .|| = |

	  ||| = |

	left

	  |
	 .| = \_

	  |
	|_/ = |

	  .
	 .| = |

	  .
	 || = |

	self

	  if there is path above and to the left default to _/
 */

const pathSpriteSheet = './images/path-light.png';

export class StonePath extends Floor {
	constructor (x, y) {
		super(pathSpriteSheet, x, y);
	}
}

export class StonePathBottomRight extends Floor {
	constructor (x, y) {
		super(pathSpriteSheet, x, y, 0, -50);
	}
}

export class StonePathBottomLeft extends Floor {
	constructor (x, y) {
		super(pathSpriteSheet, x, y, 0, -100);
	}
}

export class StonePathTopRight extends Floor {
	constructor (x, y) {
		super(pathSpriteSheet, x, y, 0, -150);
	}
}

export class StonePathTopLeft extends Floor {
	constructor (x, y) {
		super(pathSpriteSheet, x, y, 0, -200);
	}
}