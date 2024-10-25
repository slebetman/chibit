export function $ (el) {
	if (typeof el === 'string') return document.getElementById(el);
	return el;
}

export function css (id, styles) {
	for (const s in styles) {
		$(id).style[s] = styles[s];
	}
}

export function isTouchScreen () {
	return window.matchMedia("(pointer: coarse)").matches;
}

export function attachDebugBounds (sprite, color = 'blue') {
	const debugBounds = document.createElement('div');

	css(debugBounds,{
		position: 'relative',
		border: `1px solid ${color}`,
		width: `${sprite.bounds.x2 - sprite.bounds.x1}px`,
		left: `${sprite.bounds.x1}px`,
		height: `${sprite.bounds.y2 - sprite.bounds.y1}px`,
		top: `${sprite.bounds.y1}px`,
	});

	sprite.element.appendChild(debugBounds);
}