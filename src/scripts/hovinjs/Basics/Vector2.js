/**
 * Creates a Vector with 2 dimensions (x, y)
 * @class Vector2
 * @param {(string|object|Point2|Vector2|number[]|number)} x JSON string with an object or an array with 2 number values (x, y), a object Point2/Vector2, a number of the first coordinate
 * @param {number|undefined} y A number of the second coordinate or undefined value
 * @augment Point2
 */
var Vector2 = function() {
	Point2.call(this, arguments);
	
	if (arguments.length == 1 && typeof(arguments[0]) == 'string') {
		var obj = parseJSON(arguments[0]);
		if (obj !== undefined && obj.angle !== undefined && obj.magnitude !== undefined) {
			this._x = obj.magnitude * Math.cos(obj.angle);
			this._y = obj.magnitude * Math.sin(obj.angle);
		}
	}
};

inheritPrototype(Vector2, Point2);


/* Constructor */

/**
 * Create a vector by Size and Angle
 * @method fromSizeAndAngle
 * @memberof Vector2
 * @param {number} magnitude Number of the magnitude for new Vector
 * @param {number} angle Angle in radians for new Vector
 * @augment Vector2
 * @static
 */
Vector2.fromSizeAndAngle = 

/**
 * Create a vector by Size and Angle
 * @method fromMagnitudeAndAngle
 * @memberof Vector2
 * @param {number} magnitude Number of the magnitude for new Vector
 * @param {number} angle Angle in radians for new Vector
 * @augment Vector2
 * @static
 */
Vector2.fromMagnitudeAndAngle = function (magnitude, angle) {
	return new Vector2(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};

/**
 * Sum two diferent vectors and return a new one as result
 * @method sumVector
 * @memberof Vector2
 * @param {Vector2} a First vector
 * @param {Vector2} b Second vector
 * @return New Vector2 of sum result
 * @static
 */
Vector2.sumVector = function(a, b) { return new Vector2(a.x() + b.x(), a.y() + b.y()); }


/**
 * Create a vector by Size and Angle
 * @method fromMagnitudeAndAngle
 * @memberof Vector2
 * @param {number} magnitude Number of the magnitude for new Vector
 * @param {number} angle Angle in radians for new Vector
 * @augment Vector2
 * @static
 */
Vector2.subtractVector	= function(a, b) { return new Vector2(a.x() - b.x(), a.y() - b.y()); }


/**
 * Create a vector by Size and Angle
 * @method fromMagnitudeAndAngle
 * @memberof Vector2
 * @param {number} magnitude Number of the magnitude for new Vector
 * @param {number} angle Angle in radians for new Vector
 * @augment Vector2
 * @static
 */
Vector2.multiplyVector	= function(a, scalar) { return new Vector2(a.x() * scalar, a.y() * scalar); }


/**
 * Create a vector by Size and Angle
 * @method fromMagnitudeAndAngle
 * @memberof Vector2
 * @param {number} magnitude Number of the magnitude for new Vector
 * @param {number} angle Angle in radians for new Vector
 * @augment Vector2
 * @static
 */
Vector2.divideVector	= function(a, scalar) { return new Vector2(a.x() / scalar, a.y() / scalar); }


/* Properties */

Vector2.prototype.sizeSquare = function() { 
	return (this._x * this._x + this._y * this._y);
}

Vector2.prototype.size =
Vector2.prototype.magnitude = function () {
	return Math.sqrt(this.sizeSquare());
};

Vector2.prototype.angle = function () {
	return Math.atan2(this._y, this._x);
};


/* Methods */

Vector2.prototype.normalize = function () {
	var size = this.size();

	this._x /= size;
	this._y /= size;

	return this;
};

Vector2.prototype.rotate = function(ang) {
	var s = Math.sin(ang);
	var c = Math.cos(ang);
	var xvalue = this._x * c - this._y * s;
	var yvalue = this._x * s + this._y * c;
	
	this._x = xvalue;
	this._y = yvalue;
	
	return this;
}


/* Relationship */

Vector2.prototype.dot = function(vector) {
	return this._x * vector.x() + this._y * vector.y();
}

Vector2.prototype.angleBetween = function(vector) {
	var dp, angPi;
	
	dp = this.dot(vector);
	
	if (dp >= 1.0) dp = 1.0;
	else if(dp <=-1.0) dp = -1.0;
	
	angPi = Math.acos(dp);
	
	return this._y * vector.x() > this._x * vector.y() ? angPi*-1 : angPi;
}


/* Default operations */

Vector2.prototype.clone = function() {
	return new Vector2(this._x, this._y);
}

