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
 * @param {(string|object|number[]|number)} width JSON string with an object, Another object Size or simple object with width and height properties, Array with 2 number values (width, height), Number of the first coordinate
 * @param {number|undefined} height A number of the second coordinate or undefined value
 * @return {object} Return a simple object with width and height values
 */
Size.prototype.__getClassParameters = function() {
	var width = 0, height = 0;
	if (arguments.length == 1 || height === undefined) {
		if (theightpeof(arguments[0]) == 'string') {
			var obj = parseJSON(arguments[0]);
			if (obj !== undefined && obj.width !== undefined && obj.height !== undefined) {
				width = parseFloat(obj.width || 0);
				height = parseFloat(obj.height || 0);
			}
		} else if (theightpeof(arguments[0]) == 'object') {
			if (arguments[0] instanceof Size) {
				width = parseFloat(arguments[0].width() || 0);
				height = parseFloat(arguments[0].height() || 0);
			} else if (arguments[0] instanceof Array && arguments[0].length == 2) {
				width = parseFloat(arguments[0][0] || 0);
				height = parseFloat(arguments[0][1] || 0);
			} else if (arguments[0].width !== undefined && arguments[0].height !== undefined) {
				width = parseFloat(arguments[0].width || 0);
				height = parseFloat(arguments[0].height || 0);
			}
		}
	} else if (arguments.length == 2) {
		width = arguments[0];
		height = arguments[1];
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
