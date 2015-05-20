/* class Stroke */
var Stroke = function(width, style) {
	this._width	= width || 1.0;
	if (style instanceof Color || style instanceof Gradient || style instanceof Pattern)
		this._style	= style;
	else if (style instanceof Texture)
		this._style	= new Pattern(style, Pattern.REPEAT);
	else
		this._style	= new Color();
};


/* Getters and setters */

Stroke.prototype.width = function(width) {
	if (width === undefined) return this._width;
	this._width = width;
	return this;
};

Stroke.prototype.style = function(style) {
	if (style === undefined) return this._style;
	this._style = style;
	return this;
};


/* Serialization */

Stroke.prototype.toJson = 
Stroke.prototype.toString = 
Stroke.prototype.serialize = function() {
	return "{ width: " + this._width + ", style: " + this._style.toString() + " }";
}
