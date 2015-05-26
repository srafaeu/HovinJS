/**
 * Creates a Point with 2 dimensions (x, y)
 * @class Point2
 * @param {(string|object|number[]|number)} JSON string with an object or an array with 2 number values (x, y), a object Point2, a number of the first coordinate
 * @param {number} A number of the second coordinate or undefined value
 */
var Point2 = function(x, y) {
	this._x = 0;
	this._y = 0;

	if (arguments.length == 1 || y === undefined) {
		if (typeof(arguments[0]) == 'string') {
			var obj = parseJSON(arguments[0]);
			if (obj !== undefined) {
				if (obj.x !== undefined) {
					this._x = parseFloat(obj.x || 0);
					this._y = parseFloat(obj.y || 0);
				} else if (obj[0] !== undefined) {
					this._x = parseFloat(obj[0] || 0);
					this._y = parseFloat(obj[1] || 0);
				}
			} else if (arguments[0].indexOf(',') != -1) {
				var regex = /^([\d\. ]+),([\d\. ]+)$/i;
				var result = regex.exec(arguments[0]);
				if (result) {
					this._x = parseFloat(result[1] || 0);
					this._y = parseFloat(result[2] || 0);
				}
			}
		} else if (typeof(arguments[0]) == 'number') {
			this._x = arguments[0];
			this._y = arguments[0];
		} else if (typeof(arguments[0]) == 'object') {
			this._x = arguments[0].x();
			this._y = arguments[0].y();
		}
	} else if (arguments.length == 2) {
		this._x = arguments[0];
		this._y = arguments[1];
	}
};


/* ******************** Getters and setters ******************** */
/**
 * Get or set value x
 * @method x
 * @param {number|undefined} x Number of position x to set the value or undefined to get the value
 * @return {Point2|number} Return a object reference or position x value
 */
Point2.prototype.x = function(x) {
	if (x === undefined) return this._x;
	this._x = x;
	return this;
};

/**
 * Get or set value y
 * @method y
 * @param {number|undefined} y Number of position y to set the value or undefined to get the value
 * @return {Point2|number} Return a object reference or position y value
 */
Point2.prototype.y = function(y) {
	if (y === undefined) return this._y;
	this._y = y;
	return this;
};


/* ******************** Operations ******************** */

/**
 * Sum the point
 * @method add
 * @param {object|Point2|number} Object of position x and y to set the value or number to set value x
 * @param {number|undefined} number to set value y or undefined to get the value
 * @return {Point2} Return the object reference
 */
Point2.prototype.add = function() {
	if (arguments.length == 1) {
		if (typeof(arguments[0]) == 'object' && arguments[0] instanceof Point2) {
				this._x += arguments[0].x();
				this._y += arguments[0].y();
		} else if (arguments[0].x !== undefined && arguments[0].y !== undefined) {
			this._x += arguments[0].x;
			this._y += arguments[0].y;
		}
	} else if (arguments.length == 2) {
		this._x += arguments[0];
		this._y += arguments[1];
	}
	return this;
}

/**
 * Subtract the point
 * @method subtract
 * @param {object|Point2|number} Object of position x and y to set the value or number to set value x
 * @param {number|undefined} number to set value y or undefined to get the value
 * @return {Point2} Return the object reference
 */
Point2.prototype.subtract = function() {
	if (arguments.length == 1) {
		if (typeof(arguments[0]) == 'object' && arguments[0] instanceof Point2) {
				this._x += arguments[0].x();
				this._y += arguments[0].y();
		} else if (arguments[0].x !== undefined && arguments[0].y !== undefined) {
			this._x += arguments[0].x;
			this._y += arguments[0].y;
		}
	} else if (arguments.length == 2) {
		this._x += arguments[0];
		this._y += arguments[1];
	}
	return this;
}

/**
 * Multiply the point
 * @method multiply
 * @param {number} scalar Number multiplied
 * @return {Point2} Return the object reference
 */
Point2.prototype.multiply = function(scalar) {
	this._x *= scalar;
	this._y *= scalar;
	return this;
}

Point2.prototype.divide = function(scalar) {
	this._x /= scalar;
	this._y /= scalar;
	return this;
}



/* Default operations */

Point2.prototype.clone = function() {
	return new Point2(this._x, this._y);
}

/* Serialization */

Point2.prototype.toJson = 
Point2.prototype.toString = 
Point2.prototype.serialize = function() { return '{"x":' + this._x + ',"y":' + this._y + '}'; }
