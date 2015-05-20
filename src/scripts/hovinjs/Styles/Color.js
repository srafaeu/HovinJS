/* class Color */
var Color = function() {
	this._r = 0;
	this._g = 0;
	this._b = 0;
	this._a = 1.0;
	
	if (arguments.length == 1 || arguments.length == 2) {
		if (typeof(arguments[0]) === 'string') {
			if (arguments[0].indexOf('#') > -1) {
				var hex, result;
				var hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
				var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
				hex = arguments[0];
				hex = hex.replace(shorthandRegex, function(m, r, g, b) { return r + r + g + g + b + b; });
				result = hexRegex.exec(hex);
				
				if (result) {
					this._r = parseInt(result[1], 16);
					this._g = parseInt(result[2], 16);
					this._b = parseInt(result[3], 16);
				} else {		
					throw "Invalid hexadecimal format";
				}
				this._a = (arguments[1] >= 0 && arguments[1] <= 1) ? arguments[1] : 1.0;
			} else {
				var obj = parseJSON(arguments[0]);
				if (obj !== undefined) {
					if (obj.r !== undefined || obj.red !== undefined) {
						this._r = parseInt(obj.r || obj.red);
						this._g = parseInt(obj.g || obj.green);
						this._b = parseInt(obj.b || obj.blue);
						if (obj.a !== undefined || obj.alpha !== undefined)
							this._a = parseInt(obj.a || obj.alpha);
					} else if (obj[0] !== undefined) {
						this._r = parseInt(obj[0]);
						this._g = parseInt(obj[1]);
						this._b = parseInt(obj[2]);
						if (this._a !== undefined)
							this._a = parseInt(obj[3]);
					}
				}
			}
		}
	} else if (arguments.length == 3 || arguments.length == 4) {
		this._r = arguments[0] || 0;
		this._g = arguments[1] || 0;
		this._b = arguments[2] || 0;
		this._a = (arguments[3] >= 0 && arguments[3] <= 1) ? arguments[3] : 1.0;
	}
};

/* Getters and Setters */
Color.prototype.r =
Color.prototype.red = function(red) {
	if (red === undefined) return this._r;
	this._r = red;
	return this;
};

Color.prototype.g = 
Color.prototype.green = function(green) {
	if (green === undefined) return this._g;
	this._g = green;
	return this;
};

Color.prototype.b = 
Color.prototype.blue = function(blue) {
	if (blue === undefined) return this._b;
	this._b = blue;
	return this;
};

Color.prototype.a = 
Color.prototype.alpha = function(alpha) {
	if (alpha === undefined) return this._a;
	this._a = alpha;
	return this;
};


/* Serialization */

Color.prototype.toRGBA = function() {
	return "rgba(" + this._r + ", " + this._g + ", " + this._b + ", " + this._a + ");";
}

Color.prototype.toRGB = function() {
	return "rgb(" + this._r + ", " + this._g + ", " + this._b + ");";
}

Color.prototype.html =
Color.prototype.toHex = function() {
	function componentToHex(c) {
        var hex = c.toString(16).toUpperCase();
        return hex.length == 1 ? "0" + hex : hex;
    }
	
	if (this._r > 255 || this._g > 255 || this._b > 255)
        throw "Invalid color component";
	
    return "#" + componentToHex(this._r) + componentToHex(this._g) + componentToHex(this._b);
}

Color.prototype.toJson = 
Color.prototype.toString = 
Color.prototype.serialize = function() {
	return "{ red: " + this._r + ", green: " + this._g + ", blue: " + this._b + ", alpha: " + this._a + " }";
}

