import { Tool } from "./tool.mjs";
import { $, make } from "./util.mjs";

const TOOLS = [
	null,null,null,
	null,null,null,
	null,null,null,
];

function makeTool (idx) {
	const tool = make('div', {
		id: `tool${idx}`,
		className: 'tool',
	});
	const label = make('label', {
		className: 'tool-label'
	});
	label.innerText = idx;
	tool.appendChild(label);

	return tool;
}

// selected tool: border:1px solid #ff0; box-shadow:0 0 14px #ff0

export class Hotbar {
	constructor () {
		this.selected = 0;

		/** @type {Array<Tool | null>} */
		this.tools = TOOLS;
		/** @type {HTMLElement[]} */
		this.toolSlots = [];
		this.element = $('hotbar');

		for (let i=0; i < this.tools.length; i++) {
			const tool = makeTool(i+1);
			tool.onmousedown = (e) => {
				this.select(i);
				e.stopPropagation();
				e.preventDefault();
			}

			this.toolSlots.push(tool);
			this.element.appendChild(tool);
		}

		this.select(0);
	}

	/**
	 * @param {number|undefined} idx 
	 */
	select (idx) {
		this.selected = idx;

		for (const t of this.toolSlots) {
			t.classList.remove('selected');
		}

		if (idx !== undefined) {
			this.toolSlots[idx].classList.add('selected');
		}
	}
}