/*
	Description
	::public
	+	get e set Id
	+	get e set Name
	+	get e set Size
	+	get e set Unit
	+	html
	+	clone
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Font with id, name, size and unit definitions
 * @class Font
 * @param {string} id String id to identify the font
 * @param {string} name Name of the font
 * @param {number} size Size of the font and 12 as default value
 * @param {string} unit Unit type of the size choosen and pixel (px) as default value
 */
var Font = function(id, name, size, unit) {
	this._id	= id || "";
	this._name	= name || "sans-serif";
	this._size	= size || 12;
	this._unit	= unit || "px";
};

/* Getters and Setters */

/**
 * Get or set font configuration id
 * @method id
 * @param {string|undefined} id (set) Font configuration id (get) undefined to get font configuration id
 * @return {Font|string} (set) Return a Font object reference or (get) return the font configuration id
 */
Font.prototype.id = function(id) {
	if (id === undefined) return this._id;
	this._id = id;
	return this;
};

/**
 * Get or set the font name
 * @method name
 * @param {string|undefined} name (set) Font name or (get) undefined to get the name
 * @return {Font|string} (set) Return a Font object reference or (get) return the font name
 */
Font.prototype.name = function(name) {
	if (name === undefined) return this._name;
	this._name = name;
	return this;
};

/**
 * Get or set the font size
 * @method size
 * @param {string|undefined} size (set) Font size or (get) undefined to get the size
 * @return {Font|string} (set) Return a Font object reference or (get) return the font size
 */
Font.prototype.size = function(size) {
	if (size === undefined) return this._size;
	this._size = size;
	return this;
};

/**
 * Get or set the font unit
 * @method unit
 * @param {string|undefined} unit (set) Font unit or (get) undefined to get the unit
 * @return {Font|string} (set) Return a Font object reference or (get) return the font unit
 */
Font.prototype.unit = function(unit) {
	if (unit === undefined) return this._unit;
	this._unit = unit;
	return this;
};

/* Html */

/**
 * Return a string format html for font style 
 * @method html
 * @return {string} String format html for font style 
 */
Font.prototype.html = function() {
	return this._size.toString() + this._unit + " " + this._name;
}

/* Default operations */

/**
 * Clone the font to a new object
 * @method clone
 * @return {Font} Return a new object reference
 */
Font.prototype.clone = function() {
	return new Font(this._id, this._name, this._size, this._unit);
}

/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Font.prototype.serialize = function() {
	return "{ name: " + this._name + ", size: " + this._size + ", unit: " + this._unit + " }";
};

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Font.prototype.toJson = Font.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Font.prototype.toString = Font.prototype.serialize;



