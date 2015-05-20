/* class Vector2 */
var Vector2 = function() {
	this._x = 0;
	this._y = 0;
	
	if (arguments.length == 1) {
		if (typeof(arguments[0]) == 'string') {
			var obj = parseJSON(arguments[0]);
			if (obj !== undefined) {
				if (obj.x !== undefined) {
					this._x = parseFloat(obj.x || 0);
					this._y = parseFloat(obj.y || 0);
				} else if (obj[0] !== undefined) {
					this._x = parseFloat(obj[0] || 0);
					this._y = parseFloat(obj[1] || 0);
				} else if (obj.angle !== undefined && obj.magnitude !== undefined) {
					this._x = obj.magnitude * Math.cos(obj.angle);
					this._y = obj.magnitude * Math.sin(obj.angle);
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

Vector2.prototype = Point2.prototype;


/* Constructor */

Vector2.fromSizeAndAngle = 
Vector2.fromMagnitudeAndAngle = function (magnitude, angle) {
	return new Vector2(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};

Vector2.sumVector		= function(a, b) { return new Vector2(a.x() + b.x(), a.y() + b.y()); }
Vector2.subtractVector	= function(a, b) { return new Vector2(a.x() - b.x(), a.y() - b.y()); }
Vector2.multiplyVector	= function(a, scalar) { return new Vector2(a.x() * scalar, a.y() * scalar); }
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

