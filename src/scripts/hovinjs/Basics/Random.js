/**
 * Create a Random object to generate values
 * @class Random
 */
var Random = function() {};

/**
 * Returns a random number between 0 (inclusive) and 1 (exclusive)
 * @method next
 * @return {number} Floating-point, pseudo-random number in the range 0 (inclusive) and 1 (exclusive)
 */
Random.next = 
Random.prototype.next = function() {
	return Math.random();
};

/**
 * Returns a random number between minimum and maximum value
 * @method nextInt
 * @param {number} min Integer number for minimum value
 * @param {number} max Integer number for maximum value
 * @return {number} Integer, pseudo-random number in the Minimum value (inclusive) and Maximum value (exclusive)
 */
Random.nextInt = 
Random.prototype.nextInt = function(min, max) {
	return Math.floor(this.nextFloat(min, max));
};

/**
 * Returns a random number between minimum and maximum value
 * @method nextFloat
 * @param {number} min Floating-point number for minimum value
 * @param {number} max Floating-point number for maximum value
 * @return {number} Floating-point, pseudo-random number in the Minimum value (inclusive) and Maximum value (exclusive)
 */
Random.nextFloat = 
Random.prototype.nextFloat = function(min, max) {
	var a = max || 1, b = min || 0;
	
	return Math.random() * (max - min) + min;
};
