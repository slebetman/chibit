export function $ (el) {
	if (typeof el === 'string') return document.getElementById(el);
	return el;
}

export function css (id, styles) {
	for (const s in styles) {
		$(id).style[s] = styles[s];
	}
}
