/*
	Description
	::public
	+	get e set Width
	+	get e set Style
	+	html
	+	clone
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Stroke style to canvas objects
 * @class Stroke
 * @param {number} width Width of stroke in pixels
 * @param {Color|Gradient|Pattern|Texture} style An element of style for HTML or Texture reference to a new Pattern
 */
var Stroke = function(width, style) {
	this._width	= width || 1.0;
	
	Fill.call(this, style);
};

inheritPrototype(Stroke, Fill);


/* Getters and setters */

/**
 * Get or set the width of stroke
 * @method width
 * @param {number|undefined} width (set) Width of stroke in pixels (get) undefined to get the width of stroke
 * @return {Stroke|number} (set) Return a object reference or (get) return width of stroke in pixels
 */
Stroke.prototype.width = function(width) {
	if (width === undefined) return this._width;
	this._width = width;
	return this;
};

/* Html */

/**
 * Execute an HTML construction of a stroke setting style and width
 * @method html
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {Point2|Vector2} position Start position as Point2 or Vector2 for move current gradient
 */
Stroke.prototype.html = function(context, position) {
	context.lineWidth	= this._stroke.width();
	context.strokeStyle	= this._stroke.style().html(context, position);
	context.stroke();
}


/* Default operations */

/**
 * Clone the Stroke to a new object
 * @method clone
 * @return {Stroke} Return a new object reference
 */
Stroke.prototype.clone = function() {
	return new Stroke(this._width, this._style.clone());
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Stroke.prototype.serialize = function() {
	return "{ width: " + this._width + ", style: " + this._style.toString() + " }";
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Stroke.prototype.toJson = Stroke.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Stroke.prototype.toString = Stroke.prototype.serialize;