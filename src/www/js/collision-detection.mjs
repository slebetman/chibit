import { DIRECTION } from "./character.mjs";
import { Sprite } from "./sprite.mjs";

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

	// check if X intersect
	const xIntersect = (farX > tx && farX < farTx) || (x > tx && x < farTx);
	const yIntersect = (farY > ty && farY < farTy) || (y > ty && y < farTy);

	if (xIntersect && yIntersect) {
		switch (direction) {
			case DIRECTION.S: return { y: targetSprite.y + targetSprite.bounds.y1 - movingSprite.bounds.y2 };
			case DIRECTION.N: return { y: targetSprite.y + targetSprite.bounds.y2 - movingSprite.bounds.y1 };
			case DIRECTION.E:
			case DIRECTION.NE:
			case DIRECTION.SE: return { x: targetSprite.x - movingSprite.bounds.x2 };
			case DIRECTION.W:
			case DIRECTION.NW:
			case DIRECTION.SW:  return { x: targetSprite.x + targetSprite.width - movingSprite.bounds.x1 };
		}
	}

	return undefined;
}