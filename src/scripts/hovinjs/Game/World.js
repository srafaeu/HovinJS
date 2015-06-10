/*
	Description
	::public
	+	get pixel
	+	get unit
	+	toPixel
	+	toUnit
	+	pointToPixel
	+	pointToUnit
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc World proportion between pixel and unit
 * @class World
 */
var World = function() { };

/**
 * Unit proportion of world
 * @property _unit
 * @static
 */
World._unit = 1;

/**
 * Pixel proportion of world
 * @property _pixel
 * @static
 */
World._pixel = 1;


/**
 * Set the scale values for unit per pixel
 * @method scale
 * @param {number} unit The double value of the unit scale
 * @param {number} pixel The double value of the pixel scale
 * @static
 */
World.scale = function(unit, pixel) {
	World._unit   = unit;
	World._pixel  = pixel;
}


/* Converters */

/**
 * Scale value for multiply to convert pixel per unit or convert a unit to Pixel value
 * @method toPixel
 * @param {number|undefined} The double value of the unit or undefined to get the scale value
 * @return {number} The double value of pixel per unit or the converted value
 * @static
 */
World.toPixel = function(unit) {
	if (unit === undefined)
		return World._pixel / World._unit;
	else
		return unit * (World._pixel / World._unit);
}

/**
 * Scale value for multiply to convert unit per pixel or convert a pixel to Unit value
 * @method toUnit
 * @param {number|undefined} The double value of the pixel or undefined to get the scale value
 * @return {number} The double value of unit per pixel or the converted value
 * @static
 */
 World.toUnit = function(pixel) {
	if (pixel === undefined)
		return World._unit / World._pixel;
	else
		return pixel * (World._unit / World._pixel);
}


/* Convert point and vector */

/**
 * Convert a Point2 or Vector2 to pixel
 * @method pointToPixel
 * @param {Point2|Vector2} The point or vector in unit value
 * @return {Point2|Vector2} Point or vector converted to pixel
 * @static
 */
World.pointToPixel = function(point) {
	return Point2.multiply(point, toPixel());
}

/**
 * Convert a Point2 or Vector2 to unit
 * @method pointToUnit
 * @param {Point2|Vector2} The point or vector in pixel value
 * @return {Point2|Vector2} Point or vector converted to unit
 * @static
 */
World.pointToUnit = function(point) {
	return Point2.multiply(point, toUnit());
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Viewport.prototype.serialize = function() { return "{ pixel: " + World._pixel + ", unit: " + World._unit + " }"; }

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Viewport.prototype.toJson = Viewport.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Viewport.prototype.toString = Viewport.prototype.serialize;

