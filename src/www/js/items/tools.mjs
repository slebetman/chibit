import { Sprite } from "../sprite.mjs";
import { DroppedTool, Tool } from "../tool.mjs";
import { attachDebugBounds } from "../util.mjs";

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