/* class Font */
var Font = function(fontname, size, type) {
	this._fontname	= fontname || "sans-serif";
	this._size		= size || 12;
	this._type		= type || "px";
};

/* Getters and Setters */

Font.prototype.fontname = function(fontname) {
	if (fontname === undefined) return this._fontname;
	this._fontname = fontname;
	return this;
};

Font.prototype.size = function(size) {
	if (size === undefined) return this._size;
	this._size = size;
	return this;
};

Font.prototype.type = function(type) {
	if (type === undefined) return this._type;
	this._type = type;
	return this;
};

/* Html */
Font.prototype.html = function(context) {
	return this._size.toString() + this._type + " " + this._fontname;
}

/* Serialization */

Font.prototype.toJson = 
Font.prototype.toString = 
Font.prototype.serialize = function() {
	return "{ fontname: " + this._fontname + ", size: " + this._size + ", type: " + this._type + " }";
};

