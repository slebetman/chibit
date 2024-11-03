import { Chibit } from "./items/chibit.mjs";
import { items } from "./items.mjs";
import { drawMap } from "./lib/map-reader.mjs";
import { getNearestItems } from "./lib/collision-detection.mjs";
import { dialogIsActive } from "./lib/ui/dialog.mjs";
import { Hotbar } from "./lib/ui/hotbar.mjs";
import { $, appendItemToWorld } from "./lib/util.mjs";
import { initInputs } from "./lib/ui/input-handler.mjs";

async function main () {
	const map = await (await fetch('/data/map.txt')).text();

	drawMap(map);

	const chibit = items.find(x => x instanceof Chibit);

	const hotbar = new Hotbar(chibit);

	const world = $('world');
	world.ondragover = (e) => {
		e.dataTransfer.dropEffect = 'move';
		e.preventDefault();
	};
	world.ondrop = (e) => {
		const idx = parseInt(e.dataTransfer.getData('application/tool-index'),10);
		chibit.dropItem(idx);
	}

	const savedState = localStorage.getItem('saved-state');
	if (savedState) {
		const {x,y,d} = JSON.parse(savedState);

		chibit.direction = d;
		chibit.setXY(x, y);
		chibit.update();
	}

	initInputs(chibit, hotbar);
}

main();