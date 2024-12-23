import { Character, DIRECTION } from "./character.mjs";
import { items } from "../items.mjs";
import { Sprite } from "./sprite.mjs";
import { css } from "./util.mjs";

const DEBUG_COLLISION = false;

/**
 * @param {Sprite} movingSprite 
 * @param {Sprite} targetSprite
 */
function moveSouth (movingSprite, targetSprite) {
	return { y: targetSprite.y + targetSprite.bounds.y1 - movingSprite.bounds.y2 };
}

/**
 * @param {Sprite} movingSprite 
 * @param {Sprite} targetSprite
 */
function moveNorth (movingSprite, targetSprite) {
	return { y: targetSprite.y + targetSprite.bounds.y2 - movingSprite.bounds.y1 };
}

/**
 * @param {Sprite} movingSprite 
 * @param {Sprite} targetSprite
 */
function moveEast (movingSprite, targetSprite) {
	return { x: targetSprite.x + targetSprite.bounds.x1 - movingSprite.bounds.x2 };
}

/**
 * @param {Sprite} movingSprite 
 * @param {Sprite} targetSprite
 */
function moveWest (movingSprite, targetSprite) {
	return { x: targetSprite.x + targetSprite.bounds.x2 - movingSprite.bounds.x1 };
}

/**
 * @param {Sprite} movingSprite 
 * @param {Sprite} targetSprite 
 * @param {number} direction 
 */
export function collide (movingSprite, targetSprite, direction) {
	if (targetSprite.bounds.x2 === 0 && targetSprite.bounds.y2 === 0) {
		return undefined;
	}

	const x = movingSprite.x + movingSprite.bounds.x1;
	const farX = movingSprite.x + movingSprite.bounds.x2;
	const y = movingSprite.y + movingSprite.bounds.y1;
	const farY = movingSprite.y + movingSprite.bounds.y2;
	
	const tx = targetSprite.x + targetSprite.bounds.x1;
	const farTx = targetSprite.x + targetSprite.bounds.x2;
	const ty = targetSprite.y + targetSprite.bounds.y1;
	const farTy = targetSprite.y + targetSprite.bounds.y2;

	const xIntersect =
		(farX > tx && farX < farTx) || (x < farTx && x > tx) ||
		(x < farTx && farX > farTx) || (farX > tx && x < tx);
	
	const xEqual = (x === tx) && (farX === farTx);

	const yIntersect =
		(farY > ty && farY < farTy) || (y > ty && y < farTy) ||
		(farTy > y && farTy < farY) || (ty > y && ty < farY);
	
	const yEqual = (y === ty) && (farY === farTy);

	if ((xIntersect && yIntersect) || (xIntersect && yEqual) || (yIntersect && xEqual)) {
		// If target is movable move it and skip collision
		if (targetSprite.move?.(movingSprite, x, y, farX, farY, direction)) return;

		switch (direction) {
			case DIRECTION.N: return moveNorth(movingSprite, targetSprite);
			case DIRECTION.S: return moveSouth(movingSprite, targetSprite);
			case DIRECTION.E: return moveEast(movingSprite, targetSprite);
			case DIRECTION.W: return moveWest(movingSprite, targetSprite);
			case DIRECTION.NE: {
				const diffY = Math.abs(targetSprite.y - (y - targetSprite.bounds.y2));
				const diffX = Math.abs(targetSprite.x - (farX - targetSprite.bounds.x1));
				if (diffX > diffY) {
					return moveNorth(movingSprite, targetSprite);
				}
				return moveEast(movingSprite, targetSprite);
			}
			case DIRECTION.SE: {
				const diffY = Math.abs(targetSprite.y - (farY - targetSprite.bounds.y1));
				const diffX = Math.abs(targetSprite.x - (farX - targetSprite.bounds.x1));
				if (diffX > diffY) {
					return moveSouth(movingSprite, targetSprite);
				}
				return moveEast(movingSprite, targetSprite);
			}
			case DIRECTION.NW: {
				const diffY = Math.abs(targetSprite.y - (y - targetSprite.bounds.y2));
				const diffX = Math.abs(targetSprite.x - (x - targetSprite.bounds.x2));
				if (diffX > diffY) {
					return moveNorth(movingSprite, targetSprite);
				}
				return moveWest(movingSprite, targetSprite);
			}
			case DIRECTION.SW: {
				const diffY = Math.abs(targetSprite.y - (farY - targetSprite.bounds.y1));
				const diffX = Math.abs(targetSprite.x - (x - targetSprite.bounds.x2));
				if (diffX > diffY) {
					return moveSouth(movingSprite, targetSprite);
				}
				return moveWest(movingSprite, targetSprite);
			}
		}
	}

	return undefined;
}

/**
 * @param {Sprite} sprite 
 */
export function getNearestItems (sprite, distance) {
	return items.filter(i => {
		return Math.abs(sprite.x - i.x - i.bounds.x1) < distance &&
			Math.abs(sprite.y - i.y - i.bounds.y1) < distance;
	})
}

/**
 * @param {Sprite} sprite 
 */
export function collisionDetection (sprite, movers = []) {
	let nearItems = getNearestItems(sprite, 200);
	let collision = null;

	// Process nearest objects first or we may
	// accidentally teleport due to weird edge case:
	switch (sprite.direction) {
		case DIRECTION.N:
		case DIRECTION.NE:
		case DIRECTION.NW:
			nearItems.reverse();
	}

	if (DEBUG_COLLISION) {
		for (const i1 of items) {
			css(i1.element, {
				backgroundColor: 'transparent',
				boxShadow: 'none',
			})
		}

		for (const i2 of nearItems) {
			if (i2 instanceof Character) continue;

			css(i2.element, {
				backgroundColor: '#ffff6666',
				boxShadow: '0 0 20px #ffff66aa',
			})
		}
	}

	// simple collision detection
	for (const i of nearItems) {
		if (i === sprite || movers.includes(i)) continue;

		const c = collide(sprite, i, sprite.direction);

		if (c !== undefined) {
			collision = c;
			sprite.x = collision.x ?? sprite.x;
			sprite.y = collision.y ?? sprite.y;
		}
	}

	return collision;
}