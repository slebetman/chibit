import { Chibit } from "./items/chibit.mjs";
import { Tool } from "./tool.mjs";
import { $, css, make } from "./util.mjs";

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
	/**
	 * @param {Chibit} player 
	 */
	constructor (player) {
		this.selected = 0;

		/** @type {Array<Tool | null>} */
		this.tools = TOOLS;
		/** @type {HTMLElement[]} */
		this.toolSlots = [];
		this.element = $('hotbar');
		this.player = player;
		this.player.inventory = this;

		for (let i=0; i < this.tools.length; i++) {
			const tool = makeTool(i+1);
			tool.onmousedown = (e) => {
				this.select(i);
				e.stopPropagation();
			}
			tool.ondragover = (e) => {
				console.log('drag', i);
				e.dataTransfer.dropEffect = 'move';
				e.preventDefault();
			};
			tool.ondrop = (e) => {
				console.log('drop', i);
				const idx = parseInt(e.dataTransfer.getData('application/tool-index'),10);
				const itemToMove = this.tools[idx];
				this.removeTool(idx);
				this.addTool(i, itemToMove);
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
			this.player.useTool(this.tools[idx]);
		}
		else {
			this.player.useTool(null);
		}
	}

	/**
	 * @param {number} idx 
	 * @param {Tool} tool 
	 */
	addTool (idx, tool) {
		this.tools[idx] = tool;
		// css(this.toolSlots[idx],{
		// 	backgroundImage: `url(${tool.spriteSheet})`,
		// });
		this.toolSlots[idx].appendChild(tool.icon);
		tool.icon.ondragstart = (e) => {
			e.dataTransfer.setData('application/tool-index',idx);
			css(tool.icon,{
				opacity: 0.5,
			})
		}
		tool.icon.ondragend = (e) => {
			css(tool.icon,{
				opacity: 1,
			})
		}

		if (this.selected === idx) {
			this.player.useTool(tool);
		}
	}

	/**
	 * @param {number} idx 
	 */
	removeTool (idx) {
		this.tools[idx] = null;
		// css(this.toolSlots[idx],{
		// 	backgroundImage: '',
		// });
		const icon = Array.from(this.toolSlots[idx].children)
			.find(x => x.className === 'tool-icon');
		
		if (icon) {
			this.toolSlots[idx].removeChild(icon);
		}

		if (this.selected === idx) {
			this.player.useTool(null);
		}
	}
}