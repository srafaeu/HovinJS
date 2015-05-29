/*
	Description
	::public
	+	get e set Red
	+	get e set Green
	+	get e set Blue
	+	get e set Alpha
	+	toRGB
	+	toRGBA
	+	toHex
	+	html
	+	clone
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Color with red, green, blue and alpha definitions
 * @class Color
 * @param {(string|object|number[]|number)} color String with an JSON object, string with a color in hexadecimal or simple object with red, green, blue and alpha properties, Array with 3 or 4 number values (red, green, blue and alpha), Number of the red color
 * @param {number|undefined} greenOrAlpha A number of green color in decimal or floating-point value for alpha value (range 0.0 - 1.0)
 * @param {number|undefined} blue A number of green color in decimal
 * @param {number|undefined} alpha Floating-point value for alpha value (range 0.0 - 1.0)
 */
var Color = function() {
	var obj = this.__getClassParameters(arguments);
	
	this._r = obj.red;
	this._g = obj.green;
	this._b = obj.blue;
	this._a = obj.alpha;
};

/**
 * Hidden method for getting red, green, blue and alpha values from different kind of parameters
 * @method __getClassParameters
 * @param {*} parameters All possible parameters defined on constructor
 * @return {object} Return a simple object with red, green, blue and alpha values
 */
Color.prototype.__getClassParameters = function(parameters) {
	var red = 0, green = 0, blue = 0, alpha = 1.0;
	
	if (parameters.length == 1 || parameters.length == 2) {
		if (typeof(parameters[0]) === 'string') {
			if (parameters[0].indexOf('#') > -1) {
				var hex, result;
				var hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
				var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
				hex = parameters[0];
				hex = hex.replace(shorthandRegex, function(m, r, g, b) { return r + r + g + g + b + b; });
				result = hexRegex.exec(hex);
				
				if (result) {
					red		= parseInt(result[1], 16);
					green	= parseInt(result[2], 16);
					blue	= parseInt(result[3], 16);
				} else {		
					throw "Invalid hexadecimal format";
				}
				alpha = (parameters[1] >= 0 && parameters[1] <= 1) ? parameters[1] : 1.0;
			} else {
				var obj = parseJSON(parameters[0]);
				if (obj !== undefined) {
					if (obj.r !== undefined || obj.red !== undefined) {
						red		= parseInt(obj.r || obj.red);
						green	= parseInt(obj.g || obj.green);
						blue	= parseInt(obj.b || obj.blue);
						
						if (obj.a !== undefined || obj.alpha !== undefined)
							alpha = parseInt(obj.a || obj.alpha);
					}
				}
			}
		} else if (typeof(parameters[0]) === 'object') {
			if (parameters[0] instanceof Color) {
				red		= parseFloat(parameters[0].r() || 0);
				green	= parseFloat(parameters[0].g() || 0);
				blue	= parseFloat(parameters[0].b() || 0);
				
				if (parameters[0].a() !== undefined || parameters[0].alpha() !== undefined)
					alpha	= parseFloat(parameters[0].a() || 0);
				
			} else if (parameters[0] instanceof Array && parameters[0].length > 2) {
				red		= parseFloat(parameters[0][0] || 0);
				green	= parseFloat(parameters[0][1] || 0);
				blue	= parseFloat(parameters[0][2] || 0);
				
				if (parameters[0].length == 4 && parameters[0][3] !== undefined)
					alpha	= parseFloat(parameters[0][3] || 0);
				
			} else if (parameters[0].r !== undefined || parameters[0].red !== undefined) {
				red		= parseFloat(parameters[0].r || parameters[0].red || 0);
				green	= parseFloat(parameters[0].g || parameters[0].green || 0);
				blue	= parseFloat(parameters[0].b || parameters[0].blue || 0);
				
				if (parameters[0].a !== undefined || parameters[0].alpha !== undefined)
					alpha	= parseFloat(parameters[0].a || parameters[0].alpha || 0);

			}
		}
	} else if (parameters.length == 3 || parameters.length == 4) {
		red		= parameters[0] || 0;
		green	= parameters[1] || 0;
		blue	= parameters[2] || 0;
		alpha	= (parameters[3] >= 0 && parameters[3] <= 1) ? parameters[3] : 1.0;
	}
	return { 'red': red, 'green': green, 'blue': blue, 'alpha': alpha };
}


/* Getters and Setters */

/**
 * Get or set value red
 * @method red
 * @param {number|undefined} red (set) Number of channel r to set the value or (get) undefined to get the value
 * @return {Color|number} (set) Return a object reference or (get) return channel r value
 */
Color.prototype.red = function(red) {
	if (red === undefined) return this._r;
	this._r = red;
	return this;
};

/**
 * Get or set value red
 * @method r
 * @param {number|undefined} red (set) Number of channel red to set the value or (get) undefined to get the value
 * @return {Color|number} (set) Return a object reference or (get) return channel red value
 */
Color.prototype.r = Color.prototype.red;

/**
 * Get or set value green
 * @method green
 * @param {number|undefined} green (set) Number of channel green to set the value or (get) undefined to get the value
 * @return {Color|number} (set) Return a object reference or (get) return channel green value
 */
Color.prototype.green = function(green) {
	if (green === undefined) return this._g;
	this._g = green;
	return this;
};

/**
 * Get or set value green
 * @method g
 * @param {number|undefined} green (set) Number of channel green to set the value or (get) undefined to get the value
 * @return {Color|number} (set) Return a object reference or (get) return channel green value
 */
Color.prototype.g = Color.prototype.green;

/**
 * Get or set value blue
 * @method blue
 * @param {number|undefined} blue (set) Number of channel blue to set the value or (get) undefined to get the value
 * @return {Color|number} (set) Return a object reference or (get) return channel blue value
 */
Color.prototype.blue = function(blue) {
	if (blue === undefined) return this._b;
	this._b = blue;
	return this;
};

/**
 * Get or set value blue
 * @method b
 * @param {number|undefined} blue (set) Number of channel blue to set the value or (get) undefined to get the value
 * @return {Color|number} (set) Return a object reference or (get) return channel blue value
 */
Color.prototype.b = Color.prototype.blue;

/**
 * Get or set value alpha
 * @method alpha
 * @param {number|undefined} alpha (set) Number of channel alpha to set the value between 0 and 1 or (get) undefined to get the value
 * @return {Color|number} (set) Return a object reference or (get) return channel alpha value between 0 and 1
 */
Color.prototype.alpha = function(alpha) {
	if (alpha === undefined) return this._a;
	this._a = alpha;
	return this;
};

/**
 * Get or set value alpha
 * @method a
 * @param {number|undefined} alpha (set) Number of channel alpha to set the value between 0 and 1 or (get) undefined to get the value
 * @return {Color|number} (set) Return a object reference or (get) return channel alpha value between 0 and 1
 */
Color.prototype.a = Color.prototype.alpha;


/* String formats */

/**
 * Return a color in string using rgba() format
 * @method toRGBA
 * @return {string} Return a string rgba of color
 */
Color.prototype.toRGBA = function() {
	return "rgba(" + this._r + ", " + this._g + ", " + this._b + ", " + this._a + ");";
}

/**
 * Return a color in string using rgb() format
 * @method toRGB
 * @return {string} Return a string rgb of color
 */
Color.prototype.toRGB = function() {
	return "rgb(" + this._r + ", " + this._g + ", " + this._b + ");";
}

/**
 * Return a color in string using #000000 format
 * @method toHex
 * @return {string} Return a string #000000 of color
 */
Color.prototype.toHex = function() {
	function componentToHex(c) {
        var hex = c.toString(16).toUpperCase();
        return hex.length == 1 ? "0" + hex : hex;
    }
	
	if (this._r > 255 || this._g > 255 || this._b > 255)
        throw "Invalid color component";
	
    return "#" + componentToHex(this._r) + componentToHex(this._g) + componentToHex(this._b);
}

/**
 * Return a color in string using #000000 format
 * @method html
 * @return {string} Return a string #000000 of color
 */
Color.prototype.html = Color.prototype.toHex;

/* Default operations */

/**
 * Clone the color to a new object
 * @method clone
 * @return {Color} Return a new object reference
 */
Color.prototype.clone = function() {
	return new Color(this._r, this._g, this._b, this._a);
}

/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Color.prototype.serialize = function() {
	return '{"red":' + this._r + ',"green":' + this._g + ',"blue":' + this._b + ',"alpha":' + this._a + '}';
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Color.prototype.toJson = Color.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Color.prototype.toString = Color.prototype.serialize;

