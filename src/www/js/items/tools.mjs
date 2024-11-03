import { Sprite } from "../lib/sprite.mjs";
import { DroppedTool, Tool } from "../lib/tool.mjs";
import { attachDebugBounds } from "../lib/util.mjs";

export class Pickaxe extends Tool {
	constructor () {
		super('./images/tool-pickaxe.png');
	}
}

export class Axe extends Tool {
	constructor () {
		super('./images/tool-axe.png');
	}
}

export class DroppedPickaxe extends DroppedTool {
	constructor (x, y) {
		super('./images/tool-pickaxe.png', x, y, new Pickaxe());
	}
}


export class DroppedAxe extends DroppedTool {
	constructor (x, y) {
		super('./images/tool-axe.png', x, y, new Axe());
	}
}