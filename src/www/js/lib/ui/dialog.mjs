import { $ } from "../util.mjs";

let dialogActive = false;

/** @type {HTMLDialogElement} */
const dialogElement = $('dialog');

export function dialog (message) {
	dialogActive = !dialogActive;

	if (dialogActive) {
		$('dialog-message').innerHTML = message;
		dialogElement.showModal();
	}
	else {
		dialogElement.close();
	}
}

dialogElement.onclose = () => {
	dialogActive = false;
}

export function dialogIsActive () {
	return dialogActive;
}

export function closeDialog () {
	dialogElement.close();
}