/**
 * @classdesc Fill style to canvas objects
 * @class Fill
 * @param {Color|Gradient|Pattern|Texture} style An element of style for HTML or Texture reference to a new Pattern
 */
var Fill = function(style) {
	if (style instanceof Color || style instanceof Gradient || style instanceof Pattern)
		this._style	= style;
	else if (style instanceof Texture)
		this._style	= new Pattern(style, Pattern.REPEAT);
	else
		this._style	= new Color();
};


/* Getters and setters */

/**
 * Get or set style for the Fill
 * @param {Color|Gradient|Pattern} style An element of style for HTML
 * @return {Fill|Color|Gradient|Pattern} (set) Return a object reference or (get) return the style of the Fill
 */
Fill.prototype.style = function(style) {
	if (style === undefined) return this._style;
	this._style = style;
	return this;
};


/* Html */

/**
 * Execute an HTML construction of a Fill setting style
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {Point2|Vector2} position Start position as Point2 or Vector2 for move current gradient
 */
Fill.prototype.html = function(context, position) {
	context.fillStyle = this._style.html(context, position);
	context.fill();
}


/* Default operations */

/**
 * Clone the Fill to a new object
 * @return {Fill} Return a new object reference
 */
Fill.prototype.clone = function() {
	return new Fill(this._style.clone());
}


/* Serialization */

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Fill.prototype.serialize = function() {
	return "{ style: " + this._style.toString() + " }";
}

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Fill.prototype.toJson = Fill.prototype.serialize;

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Fill.prototype.toString = Fill.prototype.serialize;


