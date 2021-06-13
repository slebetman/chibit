function $ (el) {
	if (typeof el === 'string') return document.getElementById(el);
	return el;
}

function css (id, styles) {
	for (s in styles) {
		$(id).style[s] = styles[s];
	}
}
