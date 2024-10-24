import { DIRECTION } from "./character.mjs";
import { items } from "./items.mjs";
import { Sprite } from "./sprite.mjs";

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
		(farX > tx && farX < farTx) || (x > tx && x < farTx) ||
		(farTx > x && farTx < farX) || (tx > x && tx < farX);

	const yIntersect =
		(farY > ty && farY < farTy) || (y > ty && y < farTy) ||
		(farTy > y && farTy < farY) || (ty > y && ty < farY);

	if (xIntersect && yIntersect) {
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
function getNearestItems (sprite) {
	return items.filter(i => {
		return Math.abs(sprite.x - i.x) < 500 && Math.abs(sprite.y - i.y) < 500;
	})
}

/**
 * @param {Sprite} sprite 
 */
export function collisionDetection (sprite) {
	let collided = false;
	let nearItems = getNearestItems(sprite);

	switch (sprite.direction) {
		case DIRECTION.N:
		case DIRECTION.NE:
		case DIRECTION.NW:
			nearItems.reverse();
	}

	// simple collision detection
	for (const i of nearItems) {
		if (i === sprite) continue;

		const collision = collide(sprite, i, sprite.direction);

		if (collision !== undefined) {
			collided = true;
			sprite.x = collision.x ?? sprite.x;
			sprite.y = collision.y ?? sprite.y;
		}
	}

	return collided;
}