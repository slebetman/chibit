import { items } from "./items.mjs";
import * as floor from "./items/floor.mjs";
import * as furniture from "./items/furniture.mjs";
import * as roads from "./items/roads.mjs";
import * as movables from "./items/movable-items.mjs";
import * as trees from "./items/trees.mjs";
import * as doors from "./items/door.mjs";
import { Chibit } from "./items/chibit.mjs";
import { CampFire } from "./items/fire.mjs";
import { Lamp } from "./items/lamp.mjs";
import { Rock } from "./items/rocks.mjs";
import { Statue1 } from "./items/statues.mjs";
import { Wall } from "./items/wall.mjs";
import { Sprite } from "./sprite.mjs";
import { Water } from "./items/water.mjs";
import { $, css } from "./util.mjs";

const types = {
	Wall,
	Chibit,
	Lamp,
	Rock,
	CampFire,
	Statue1,
	Water,
	...doors,
	...floor,
	...furniture,
	...roads,
	...trees,
	...movables,
}

const itemType = {}

/**
 * @param {string} map 
 * @returns 
 */
function parseMap (map) {
	const [ rawHeaders, rawMap ] = map.split(/^____+\s*$/m);

	const mapHeaders = {
		origin: { x: 0, y: 0}
	};

	for (const h of rawHeaders.split(';')) {
		const match = h.trim().match(/^([^\s=]+)\s*=\s*([\s\S]+)$/m);

		if (!match) continue; // skip blank lines

		const [ _, k, v ] = match;

		if (k === 'origin') {
			const [ x , y ] = v.split('x').map(x => parseInt(x,10));
			mapHeaders.origin = {x,y};
		}
		else if (k === 'background') {
			mapHeaders.background = v.trim();
		}
		else {
			const tval = v.split(',').map(x => x.trim());

			for (const val of tval) {
				const [t, ...args] = val.split(':').map(x => x.trim());
				const arg = args
					.map(x => x.trim().replace(/\s+/mg,' ').replace(/\s*=\s*/,'='))
					.join(',');

				if (types[t]) {
					if (!itemType[k]) {
						itemType[k] = [];
					}
					itemType[k].push([t,arg]);
				}
				else {
					console.error('Unsupported type', t);
				}
			}
		}
	}

	const mapItems = [];
	let row = 0;

	for (const l of rawMap.split('\n')) {
		let col = 0;
		for (const c of l.split('')) {
			if (itemType[c]) {
				for (const t of itemType[c]) {
					mapItems.push({
						x: col,
						y: row,
						item: t[0],
						arg: t[1],
					})
				}
			}
			col++;
		}
		row++;
	}

	// console.log(itemType);

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
	const world = $('world');

	const adjustableItems = [];

	if (mapHeaders.background) {
		css(world, {
			backgroundImage: `url(/images/${mapHeaders.background})`,
		})
	}

	for (const i of mapItems) {
		const itemClass = types[i.item];

		/** @type {Sprite} */
		const item = new itemClass(
			((i.x + mapHeaders.origin.x) * 100) - itemClass.base.x,
			((i.y + mapHeaders.origin.y) * 50) - itemClass.base.y,
			i.arg,
		);

		if (item.bounds.x2 && item.bounds.y2) {
			items.push(item);
			item.update?.();
		}

		if (item.adjust) {
			adjustableItems.push(item);
		}

		world.appendChild(item.element);
	}

	for (const i of adjustableItems) {
		i.adjust?.(adjustableItems);
	}
}