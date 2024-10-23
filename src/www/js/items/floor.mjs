import { Sprite } from "../sprite.mjs";
import { css } from "../util.mjs";

class Floor extends Sprite {
	static base = {
		x: 50,
		y: 15,
	}

	constructor (spriteSheet, x, y) {
		super(spriteSheet, 100, 50,{
			x1: 0, x2: 0,
			y1: 0, y2: 0,
		});
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

export class StonePath extends Floor {
	constructor (x, y) {
		super('./images/path.png', x, y);
	}
}

export class StonePathBottomRight extends Floor {
	constructor (x, y) {
		super('./images/path.png', x, y);
		css(this.element,{
			backgroundPosition: '0px -50px',
		});
	}
}

export class StonePathBottomLeft extends Floor {
	constructor (x, y) {
		super('./images/path.png', x, y);
		css(this.element,{
			backgroundPosition: '0px -100px',
		});
	}
}

export class StonePathTopRight extends Floor {
	constructor (x, y) {
		super('./images/path.png', x, y);
		css(this.element,{
			backgroundPosition: '0px -150px',
		});
	}
}

export class StonePathTopleft extends Floor {
	constructor (x, y) {
		super('./images/path.png', x, y);
		css(this.element,{
			backgroundPosition: '0px -200px',
		});
	}
}