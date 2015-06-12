/*
	Description
	::public
	+	get e set percent
	+	get e set color
	+	clone
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Color with red, green, blue and alpha definitions
 * @class Color
 * @param {(string|object|number[]|number)} color String with an JSON object, string with a color in hexadecimal or simple object with red, green, blue and alpha properties, Array with 3 or 4 number values (red, green, blue and alpha), Number of the red color
 * @param {number|undefined} greenOrAlpha A number of green color in decimal or floating-point value for alpha value (range 0.0 - 1.0)
 * @param {number|undefined} blue A number of green color in decimal
 * @param {number|undefined} alpha Floating-point value for alpha value (range 0.0 - 1.0)
 */
var GradientStop = function(percent, color) {
	this._percent	= percent || 1.0;
	if (color instanceof Color)
		this._color	= color;
	else
		this._color	= new Color();
};


/* Getters and setters */

/**
 * Get or set percent value
 * @param {number|undefined} percent (set) Number of stop percent position to set the value or (get) undefined to get the stop percent position
 * @return {GradientStop|number} (set) Return a object reference or (get) return stop percent position
 */
GradientStop.prototype.percent = function(percent) {
	if (percent === undefined) return this._percent;
	this._percent = percent;
	return this;
};

/**
 * Get or set color
 * @param {number|undefined} green (set) Number of channel green to set the value or (get) undefined to get the value
 * @return {GradientStop|Color} (set) Return a object reference or (get) return channel green value
 */
GradientStop.prototype.color = function(color) {
	if (color === undefined) return this._color;
	this._color = color;
	return this;
};

/* Default operations */

/**
 * Clone the GradientStop to a new object
 * @return {GradientStop} Return a new object reference
 */
GradientStop.prototype.clone = function() {
	return new GradientStop(this._percent, this._color);
}

/* Serialization */

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
GradientStop.prototype.serialize = function() {
	return "{ percent: " + this._percent + ", color: " + this._color.toString() + " }";
}

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
GradientStop.prototype.toJson = GradientStop.prototype.serialize;

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
GradientStop.prototype.toString	= GradientStop.prototype.serialize;


