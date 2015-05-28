/*
	Description
	::public
	+	next (0 - 1]
	+	nextInt (0 - max]
	+	nextRange (min - max]
	+	nextRangeInt (min - max]

	::static
	
*/

/**
 * @classdesc Create a Random object to generate values
 * @class Random
 */
var Random = function() {};


/* Static */

/**
 * Returns a random number between 0 (inclusive) and 1 (exclusive)
 * @method next
 * @return {number} Floating-point, pseudo-random number in the range 0 (inclusive) and 1 (exclusive)
 * @static
 */
Random.next = function() {
	return Math.random();
};

/**
 * Returns a random number between minimum and maximum value
 * @method nextRange
 * @param {number} min Floating-point number for minimum value
 * @param {number} max Floating-point number for maximum value
 * @return {number} Floating-point, pseudo-random number in the Minimum value (inclusive) and Maximum value (exclusive)
 */
Random.nextRange = function(min, max) {
	var a = max || 1, b = min || 0;
	
	return Math.random() * (a - b) + b;
};

/**
 * Returns a random integer number between zero and maximum value
 * @method nextInt
 * @param {number} max Integer number for maximum value
 * @return {number} Integer, pseudo-random number in the range 0 (inclusive) and Maximum value (exclusive)
 * @static
 */
Random.nextInt = function(max) {
	return Math.floor(this.nextRange(0, max));
};

/**
 * Returns a random number between minimum and maximum value
 * @method nextRangeInt
 * @param {number} min Integer number for minimum value
 * @param {number} max Integer number for maximum value
 * @return {number} Integer, pseudo-random number in the Minimum value (inclusive) and Maximum value (exclusive)
 * @static
 */
Random.nextRangeInt = function(min, max) {
	return Math.floor(this.nextRange(min, max));
};


/* Methods */

/**
 * Returns a random number between 0 (inclusive) and 1 (exclusive)
 * @method next
 * @return {number} Floating-point, pseudo-random number in the range 0 (inclusive) and 1 (exclusive)
 */
Random.prototype.next = Random.next;

/**
 * Returns a random number between minimum and maximum value
 * @method nextRange
 * @param {number} min Floating-point number for minimum value
 * @param {number} max Floating-point number for maximum value
 * @return {number} Floating-point, pseudo-random number in the Minimum value (inclusive) and Maximum value (exclusive)
 * @static
 */
Random.prototype.nextRange = Random.nextRange;

/**
 * Returns a random integer number between zero and maximum value
 * @method nextInt
 * @param {number} max Integer number for maximum value
 * @return {number} Integer, pseudo-random number in the range 0 (inclusive) and Maximum value (exclusive)
 */
Random.prototype.nextInt = Random.nextInt;

/**
 * Returns a random number between minimum and maximum value
 * @method nextRangeInt
 * @param {number} min Integer number for minimum value
 * @param {number} max Integer number for maximum value
 * @return {number} Integer, pseudo-random number in the Minimum value (inclusive) and Maximum value (exclusive)
 */
Random.prototype.nextRangeInt = Random.nextRangeInt;

