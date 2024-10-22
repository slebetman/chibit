import { DIRECTION } from "./character.mjs";
import { Sprite } from "./sprite.mjs";

/**
 * @param {Sprite} movingSprite 
 * @param {Sprite} targetSprite 
 * @param {number} direction 
 */
export function collide (movingSprite, targetSprite, direction) {
	const x = movingSprite.x;
	const farX = x + movingSprite.width;
	const y = movingSprite.y;
	const farY = y + movingSprite.height;
	
	const tx = targetSprite.x;
	const farTx = tx + targetSprite.width;
	const ty = targetSprite.y;
	const farTy = ty + targetSprite.height;

	// check if X intersect
	const xIntersect = (farX > tx && farX < farTx) || (x > tx && x < farTx);
	const yIntersect = (farY > ty && farY < farTy) || (y > ty && y < farTy);

	if (xIntersect && yIntersect) {
		switch (direction) {
			case DIRECTION.S: return { y: targetSprite.y - movingSprite.height };
			case DIRECTION.N: return { y: targetSprite.y + targetSprite.height };
			case DIRECTION.E:
			case DIRECTION.NE:
			case DIRECTION.SE: return { x: targetSprite.x - movingSprite.width };
			case DIRECTION.W:
			case DIRECTION.NW:
			case DIRECTION.SW:  return { x: targetSprite.x + targetSprite.width };
		}
	}

	return undefined;
}