import { $ } from "./util.mjs";

let dialogActive = false;

export function dialog (message) {
	dialogActive = !dialogActive;

	if (dialogActive) {
		$('dialog-message').innerHTML = message;
		$('dialog').showModal();
	}
	else {
		$('dialog').close();
	}
}

export function dialogIsActive () {
	return dialogActive;
}