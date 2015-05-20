/**
 * Represent an Angle
 */
var Angle = function() {};

/**
 * Convert radians to degrees
 * @param {Number} radians Value of an angle in radians
 * @returns {Number} Value of an angle in degrees between 0 and 360
 */
Angle.toDegrees = function(radians) {
	return (radians * (180 / Math.PI));
};

/**
 * Convert degrees to radians
 * @param {Number} degrees Value of an angle in degrees
 * @returns {Number} Value of an angle in radians between 0 and 2&pi;
 */
Angle.toRadians = function(degrees) {
	return (degrees * (Math.PI / 180));
};
