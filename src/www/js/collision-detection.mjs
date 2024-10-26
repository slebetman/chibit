import { Character, DIRECTION } from "./character.mjs";
import { items } from "./items.mjs";
import { Sprite } from "./sprite.mjs";
import { css } from "./util.mjs";

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

	const yIntersect =
		(farY > ty && farY < farTy) || (y > ty && y < farTy) ||
		(farTy > y && farTy < farY) || (ty > y && ty < farY);

	if (xIntersect && yIntersect) {
		// If target is movable move it and skip collision
		if (targetSprite.move?.(movingSprite, x, y, farX, farY, direction)) return;

		switch (direction) {
			case DIRECTION.N: return moveNorth(movingSprite, targetSprite);
			case DIRECTION.S: return moveSouth(movingSprite, targetSprite);
			case DIRECTION.E: return moveEast(movingSprite, targetSprite);
			case DIRECTION.W: return moveWest(movingSprite, targetSprite);
			case DIRECTION.NE:
				if (movingSprite.y + movingSprite.bounds.y2 > targetSprite.y + targetSprite.bounds.y2) {
					return moveNorth(movingSprite, targetSprite);
				}
				return moveEast(movingSprite, targetSprite);
			case DIRECTION.SE:
				if (movingSprite.y + movingSprite.bounds.y1 < targetSprite.y + targetSprite.bounds.y1) {
					return moveSouth(movingSprite, targetSprite);
				}
				return moveEast(movingSprite, targetSprite);
			case DIRECTION.NW:
				if (movingSprite.y + movingSprite.bounds.y2 > targetSprite.y + targetSprite.bounds.y2) {
					return moveNorth(movingSprite, targetSprite);
				}
				return moveWest(movingSprite, targetSprite);
			case DIRECTION.SW:
				if (movingSprite.y + movingSprite.bounds.y1 < targetSprite.y + targetSprite.bounds.y1) {
					return moveSouth(movingSprite, targetSprite);
				}
				return moveWest(movingSprite, targetSprite);
		}
	}

	return undefined;
}

/**
 * @param {Sprite} sprite 
 */
export function getNearestItems (sprite, distance) {
	return items.filter(i => {
		return Math.abs(sprite.x - i.x) < distance && Math.abs(sprite.y - i.y) < distance;
	})
}

/**
 * @param {Sprite} sprite 
 */
export function collisionDetection (sprite, movers = []) {
	let collided = false;
	let nearItems = getNearestItems(sprite, 300);

	// Process nearest objects first or we may
	// accidentally teleport due to weird edge case:
	switch (sprite.direction) {
		case DIRECTION.N:
		case DIRECTION.NE:
		case DIRECTION.NW:
			nearItems.reverse();
	}

	// for (const i1 of items) {
	// 	css(i1.element, {
	// 		backgroundColor: 'transparent',
	// 		boxShadow: 'none',
	// 		borderRadius: '0',
	// 	})
	// }

	// for (const i2 of nearItems) {
	// 	if (i2 instanceof Character) continue;

	// 	css(i2.element, {
	// 		backgroundColor: '#ffff6666',
	// 		boxShadow: '0 0 20px #ffff66aa',
	// 		borderRadius: '20px',
	// 	})
	// }

	// simple collision detection
	for (const i of nearItems) {
		if (i === sprite || movers.includes(i)) continue;

		const collision = collide(sprite, i, sprite.direction);

		if (collision !== undefined) {
			collided = true;
			sprite.x = collision.x ?? sprite.x;
			sprite.y = collision.y ?? sprite.y;
		}
	}

	return collided;
}