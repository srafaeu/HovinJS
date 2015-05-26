/*
	Description
	::public
		get e set X
		get e set Y
		add other point or x and y
		subtract other point or x and y
		multiply a scalar
		divide a scalar
		clone
		serialize / toJSON / toString
		
	::static
		add two points
		subtract two points
		multiply a point and a scalar
		divide a point and a scalar

*/


/**
 * @classdesc Creates a Point with 2 dimensions (x, y)
 * @class Point2
 * @param {(string|object|number[]|number)} x JSON string with an object, Another object Point2 or simple object with x and y properties, Array with 2 number values (x, y), Number of the first coordinate
 * @param {number|undefined} y A number of the second coordinate or undefined value
 */
var Point2 = function(x, y) {
	var obj = this.__getParameters(arguments);
	
	this._x = obj.x;
	this._y = obj.y;
};

Point2.prototype.__getParameters = function() {
	var x = 0, y = 0;
	if (arguments.length == 1 || y === undefined) {
		if (typeof(arguments[0]) == 'string') {
			var obj = parseJSON(arguments[0]);
			if (obj !== undefined && obj.x !== undefined && obj.y !== undefined) {
				x = parseFloat(obj.x || 0);
				y = parseFloat(obj.y || 0);
			}
		} else if (typeof(arguments[0]) == 'object') {
			if (arguments[0] instanceof Point2) {
				x = parseFloat(arguments[0].x() || 0);
				y = parseFloat(arguments[0].y() || 0);
			} else if (arguments[0] instanceof Array && arguments[0].length == 2) {
				x = parseFloat(arguments[0][0] || 0);
				y = parseFloat(arguments[0][1] || 0);
			} else if (arguments[0].x !== undefined) {
				x = parseFloat(arguments[0].x || 0);
				y = parseFloat(arguments[0].y || 0);
			}
		}
	} else if (arguments.length == 2) {
		x = arguments[0];
		y = arguments[1];
	}
	return { 'x': x, 'y': y };
}


/* ******************** Getters and setters ******************** */

/**
 * Get or set value x
 * @method x
 * @param {number|undefined} x (set) Number of position x to set the value or (get) undefined to get the value
 * @return {Point2|number} (set) Return a object reference or (get) return position x value
 */
Point2.prototype.x = function(x) {
	if (x === undefined) return this._x;
	this._x = x;
	return this;
};

/**
 * Get or set value y
 * @method y
 * @param {number|undefined} y (set) Number of position y to set the value or (get) undefined to get the value
 * @return {Point2|number} (set) Return a object reference or (get) return position y value
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
	var obj = this.__getParameters(arguments);
	
	this._x += obj.x;
	this._y += obj.y;
	
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
	var obj = this.__getParameters(arguments);
	
	this._x -= obj.x;
	this._y -= obj.y;
	
	return this;
}

/**
 * Multiply the point by a scalar value
 * @method multiply
 * @param {number} scalar Number multiplied
 * @return {Point2} Return the object reference
 */
Point2.prototype.multiply = function(scalar) {
	this._x *= scalar;
	this._y *= scalar;
	return this;
}

/**
 * Divide the point by a scalar value
 * @method divide
 * @param {number} scalar Number divided
 * @return {Point2} Return the object reference
 */
Point2.prototype.divide = function(scalar) {
	this._x /= scalar;
	this._y /= scalar;
	return this;
}


/* Default operations */

/**
 * Clone the point to a new object
 * @method clone
 * @return {Point2} Return a new object the object reference
 */
Point2.prototype.clone = function() {
	return new Point2(this._x, this._y);
}

/* Serialization */

/**
 * Serialize a object into a 
 * @method serialize
 * @return {Point2} Return a new object the object reference
 */
Point2.prototype.toJson = 
Point2.prototype.toString = 
Point2.prototype.serialize = function() { return '{"x":' + this._x + ',"y":' + this._y + '}'; }
