import { items } from "./items.mjs";
import { Chibit } from "./items/chibit.mjs";
import { CampFire } from "./items/fire.mjs";
import * as floor from "./items/floor.mjs";
import * as furniture from "./items/furniture.mjs";
import * as roads from "./items/roads.mjs";
import { Lamp } from "./items/lamp.mjs";
import { Rock } from "./items/rocks.mjs";
import { Statue1 } from "./items/statues.mjs";
import { Tree1 } from "./items/trees.mjs";
import { Wall } from "./items/wall.mjs";
import { Sprite } from "./sprite.mjs";

const types = {
	Wall,
	Chibit,
	Lamp,
	Tree1,
	Rock,
	CampFire,
	Statue1,
	...floor,
	...furniture,
	...roads,
}

const itemType = {}

function parseMap (map) {
	const lines = map.split(/\r?\n/);

	const mapHeaders = {
		origin: { x: 0, y: 0}
	};
	const mapItems = [];

	let endOfHeaders = false;
	let row = 0;

	for (const l of lines) {
		if (!endOfHeaders) {
			if (l.match(/^____+\s*$/)) {
				endOfHeaders = true;
			}
			else {
				const [ k, v ] = l.split('=').map(x => x.trim());

				if (k === 'origin') {
					const [ x , y ] = v.split('x').map(x => parseInt(x,10));
					mapHeaders.origin = {x,y};
				}
				else {
					const tval = v.split(',');

					for (const t of tval) {
						if (types[t]) {
							if (!itemType[k]) {
								itemType[k] = [];
							}
							itemType[k].push(types[t]);
						}
						else {
							console.error('Unsupported type', t);
						}
					}
				}
			}
		}
		else {
			let col = 0;
			for (const c of l.split('')) {
				if (itemType[c]) {
					for (const t of itemType[c]) {
						mapItems.push({
							x: col,
							y: row,
							item: t,
						})
					}
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

	const roadItems = [];

	for (const i of mapItems) {

		/** @type {Sprite} */
		const item = new i.item(
			((i.x + mapHeaders.origin.x) * 100) - i.item.base.x,
			((i.y + mapHeaders.origin.y) * 50) - i.item.base.y
		);

		if (item.bounds.x2 && item.bounds.y2) {
			items.push(item);
			item.update?.();
		}
		else if (item instanceof roads.Road) {
			roadItems.push(item);
		}
	}

	for (const i of roadItems) {
		i.adjust?.(roadItems);
	}
}