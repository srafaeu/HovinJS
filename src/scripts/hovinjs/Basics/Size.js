/*
	Description
	::public
	+	get e set width
	+	get e set height
	+	clone
	+	serialize / toJSON / toString

	::static
	
*/

/**
 * @classdesc Size with 2 dimensions (width, height)
 * @class Size
 * @param {(string|object|number[]|number)} width JSON string with an object, Another object Size or simple object with width and height properties, Array with 2 number values (width, height), Number of the first coordinate
 * @param {number|undefined} height A number of the second coordinate or undefined value
 */
var Size = function(width, height) {
	var obj = this.__getClassParameters(arguments);
	
	this._width = obj.width;
	this._height = obj.height;
};

/**
 * Hidden method for getting width and height values from different kind of parameters
 * @method __getClassParameters
 * @param {*} parameters All possible parameters defined on constructor
 * @return {object} Return a simple object with width and height values
 */
Size.prototype.__getClassParameters = function(parameters) {
	var width = 0, height = 0;
	if (parameters.length == 1 || height === undefined) {
		if (typeof(parameters[0]) == 'string') {
			var obj = parseJSON(parameters[0]);
			if (obj !== undefined && obj.width !== undefined && obj.height !== undefined) {
				width = parseFloat(obj.width || 0);
				height = parseFloat(obj.height || 0);
			}
		} else if (typeof(parameters[0]) == 'object') {
			if (parameters[0] instanceof Size) {
				width = parseFloat(parameters[0].width() || 0);
				height = parseFloat(parameters[0].height() || 0);
			} else if (parameters[0] instanceof Array && parameters[0].length == 2) {
				width = parseFloat(parameters[0][0] || 0);
				height = parseFloat(parameters[0][1] || 0);
			} else if (parameters[0].width !== undefined && parameters[0].height !== undefined) {
				width = parseFloat(parameters[0].width || 0);
				height = parseFloat(parameters[0].height || 0);
			}
		}
	} else if (parameters.length == 2) {
		width = parameters[0];
		height = parameters[1];
	}
	return { 'width': width, 'height': height };
}


/* Getters and setters */

/**
 * Get or set value width
 * @method width
 * @param {number|undefined} width (set) Number of position width to set the value or (get) undefined to get the value
 * @return {Size|number} (set) Return a object reference or (get) return position width value
 */
Size.prototype.width = function(width) {
	if (width === undefined) return this._width;
	this._width = width;
	return this;
};

/**
 * Get or set value height
 * @method height
 * @param {number|undefined} height (set) Number of position height to set the value or (get) undefined to get the value
 * @return {Size|number} (set) Return a object reference or (get) return position height value
 */
Size.prototype.height = function(height) {
	if (height === undefined) return this._height;
	this._height = height;
	return this;
};


/* Default operations */

/**
 * Clone the size to a new object
 * @method clone
 * @return {Size} Return a new object reference
 */
Size.prototype.clone = function() {
	return new Size(this._width, this._height);
}

/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Size.prototype.toJson = 
Size.prototype.toString = 
Size.prototype.serialize = function() { return '{"width":' + this._width + ',"height":' + this._height + '}'; }
