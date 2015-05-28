/* class Font */
var Font = function(name, size, unit) {
	this._id	= id || "sans-serif";
	this._name	= name || "sans-serif";
	this._size	= size || 12;
	this._unit	= unit || "px";
};

/* Getters and Setters */

Font.prototype.name = function(name) {
	if (name === undefined) return this._name;
	this._name = name;
	return this;
};

Font.prototype.size = function(size) {
	if (size === undefined) return this._size;
	this._size = size;
	return this;
};

Font.prototype.unit = function(unit) {
	if (unit === undefined) return this._unit;
	this._unit = unit;
	return this;
};

/* Html */
Font.prototype.html = function(context) {
	return this._size.toString() + this._unit + " " + this._name;
}

/* Serialization */
Font.prototype.serialize = function() {
	return "{ name: " + this._name + ", size: " + this._size + ", unit: " + this._unit + " }";
};

Font.prototype.toJson = Font.prototype.serialize;

Font.prototype.toString = Font.prototype.serialize;



