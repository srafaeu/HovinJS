/* class BoundingBox */
var BoundingBox = function() {
	this._position	= new Vector2();
	this._size		= new Size();

	if (arguments.length == 1) {
		if (typeof(arguments[0]) == 'string') {
			var obj = parseJSON(arguments[0]);
			if (obj !== undefined) {
				if (obj.x !== undefined) {
					this._position	= new Vector2(parseFloat(obj.x || 0), parseFloat(obj.y || 0));
					this._size		= new Size(parseFloat(obj.width || 0), parseFloat(obj.height || 0));
				} else if (obj[0] !== undefined) {
					this._position	= new Vector2(parseFloat(obj[0] || 0), parseFloat(obj[1] || 0));
					this._size		= new Size(parseFloat(obj[2] || 0), parseFloat(obj[3] || 0));
				}
			} else if (arguments[0].indexOf(',') != -1) {
				var regex = /^([\d\. ]+),([\d\. ]+),([\d\. ]+),([\d\. ]+)$/i;
				var result = regex.exec(arguments[0]);
				if (result) {
					this._position	= new Vector2(parseFloat(result[1] || 0), parseFloat(result[2] || 0));
					this._size		= new Size(parseFloat(result[3] || 0), parseFloat(result[4] || 0));
				}
			}
		} else if (typeof(arguments[0]) == 'number') {
			this._position	= new Vector2(arguments[0], arguments[0]);
			this._size		= new Size(arguments[0], arguments[0]);
		}
	} else if (arguments.length == 2) {
		if (arguments[0] instanceof Point)
			this._position = new Vector2(arguments[0].x(), arguments[0].y());
		
		if (arguments[1] instanceof Size)
			this._size = new Size(arguments[1].width(), arguments[1].height());
		
	} else if (arguments.length == 4) {
		this._position	= new Vector2(arguments[0], arguments[1]);
		this._size		= new Size(arguments[2], arguments[3]);
	}
};


/* Getters and setters */

BoundingBox.prototype.x = function(x) {
	if (x === undefined) return this._position.x();
	this._position.x(x);
	return this;
};

BoundingBox.prototype.y = function(y) {
	if (y === undefined) return this._position.y();
	this._position.y(y);
	return this;
};

BoundingBox.prototype.width = function(width) {
	if (width === undefined) return this._size.width();
	this._size.width(width);
	return this;
};

BoundingBox.prototype.height = function(height) {
	if (height === undefined) return this._size.height();
	this._size.height(height);
	return this;
};

BoundingBox.prototype.position = function() {
	if (arguments.length == 0) return this._position.position();
	if (arguments.length == 1) {
		if (arguments[0] instanceof Vector2 || arguments[0] instanceof Point2) {
			this._x = arguments[0].x();
			this._y = arguments[0].y();
		} else if (typeof(arguments[0]) == 'number') {
			this._x = arguments[0];
			this._y = arguments[0];
		}
	} else if (arguments.length == 2) {
		this._x = arguments[0];
		this._y = arguments[1];
	}
	return this;
};

BoundingBox.prototype.size = function() {
	if (arguments.length == 0) return this._size.size();
	if (arguments.length == 1) {
		if (arguments[0] instanceof Size) {
				this._width	= arguments[0].width();
				this._height = arguments[0].height();
		} else if (typeof(arguments[0]) == 'number') {
			this._width	= arguments[0];
			this._height = arguments[0];
		}
	} else if (arguments.length == 2) {
		this._width = arguments[0];
		this._height = arguments[1];
	}
	return this;
};


/* Calculation */

BoundingBox.prototype.add = function() {
	if (arguments.length == 1) {
		if (typeof(arguments[0]) == 'object') {
			this._x += arguments[0].x();
			this._y += arguments[0].y();
		} else if (typeof(arguments[0]) == 'number') {
			this._x += arguments[0];
			this._y += arguments[0];
		}
	} else if (arguments.length == 2) {
		this._x += arguments[0];
		this._y += arguments[1];
	}
}


/* Default operations */

BoundingBox.prototype.clone = function() {
	return new BoundingBox(this._position.x(), this._position.y(), this._size.width(), this._size.height());
}

/* Serialization */

BoundingBox.prototype.toJson = 
BoundingBox.prototype.toString = 
BoundingBox.prototype.serialize = function() { return '{"position":' + this._position + ',"size":' + this._size + '}'; }
