/* class Size */
var Size = function() {
	this._width		= 0;
	this._height	= 0;

	if (arguments.length == 1) {
		if (typeof(arguments[0]) == 'string') {
			var obj = parseJSON(arguments[0]);
			if (obj !== undefined) {
				if (obj.width !== undefined) {
					this._width = parseFloat(obj.width || 0);
					this._height = parseFloat(obj.height || 0);
				} else if (obj[0] !== undefined) {
					this._width = parseFloat(obj[0] || 0);
					this._height = parseFloat(obj[1] || 0);
				}
			} else if (arguments[0].indexOf(',') != -1) {
				var regex = /^([\d\. ]+),([\d\. ]+)$/i;
				var result = regex.exec(arguments[0]);
				if (result) {
					this._width = parseFloat(result[1] || 0);
					this._height = parseFloat(result[2] || 0);
				}
			}
		} else if (typeof(arguments[0]) == 'number') {
			this._width	= arguments[0];
			this._height = arguments[0];
		} else if (typeof(arguments[0]) == 'object') {
			this._width = arguments[0].width();
			this._height = arguments[0].height();
		}
	} else if (arguments.length == 2) {
		this._width = arguments[0];
		this._height = arguments[1];
	}
};


/* Getters and setters */

Size.prototype.width = function(width) {
	if (width === undefined) return this._width;
	this._width = width;
	return this;
};

Size.prototype.height = function(height) {
	if (height === undefined) return this._height;
	this._height = height;
	return this;
};


/* Default operations */

Size.prototype.clone = function() {
	return new Size(this._width, this._height);
}


/* Serialization */

Size.prototype.toJson = 
Size.prototype.toString = 
Size.prototype.serialize = function() { return '{"width":' + this._width + ',"height":' + this._height + '}'; }


