import { items } from "./items.mjs";
import { Chibit } from "./items/chibit.mjs";
import { Lamp } from "./items/lamp.mjs";
import { Wall } from "./items/wall.mjs";

const types = {
	Wall,
	Chibit,
	Lamp,
}

const itemType = {}

function parseMap (map) {
	const lines = map.split(/\r?\n/);

	const mapHeaders = [];
	const mapItems = [];

	let endOfHeaders = false;
	let row = 0;

	for (const l of lines) {
		if (!endOfHeaders) {
			if (l.match(/^____+$/)) {
				endOfHeaders = true;
			}
			else {
				const [ k, t ] = l.split('=').map(x => x.trim());

				if (types[t]) {
					itemType[k] = types[t];
				}
				else {
					console.error('unsupported type', t);
				}
			}
		}
		else {
			let col = 0;
			for (const c of l.split('')) {
				if (itemType[c]) {
					mapItems.push({
						x: col,
						y: row,
						item: itemType[c],
					})
				}
				col++;
			}
			row++;
		}
	}

	return {
		mapHeaders,
		mapItems,
	}
}

/**
 * @param {string} map 
 */
export function drawMap (map) {
	const { mapHeaders, mapItems } = parseMap(map);

	for (const i of mapItems) {
		const item = new i.item(
			(i.x * 100) - i.item.base.x,
			(i.y * 50) - i.item.base.y
		);

		items.push(item);

		item.update?.();
	}
}