const htmlEscapeCodes = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#039;",
};

function escape (pre, val) {
	let value = val;

	if (value === undefined || value === null) {
		value = '';
	}

	if (pre.match(/\$$/)) {
		return pre.replace(/\$$/,'') + value;
	}
	return pre + String(value)
		.replace(/&|<|>|"|'/g, (m) => htmlEscapeCodes[m]);
}

export const html = (strings, ...values) => {
	let ret = '';
	const len = strings.length;

	// This is faster than map or for..of
	for (let i=0;i < len; i++) {
		const x = strings[i];
		const v = values[i];
		ret += escape(x, v);
	}

	return ret;
}
