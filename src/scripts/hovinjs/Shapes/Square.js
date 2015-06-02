/*
	Description
	::public
	+	get e set Size
	+	get e set Fill
	+	get e set Stroke
	+	draw
	+	clone
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Square drawable shape
 * @class Square
 * @param {number} size Size of square
 * @param {Fill|Stroke} style1 Style for Stroke or Fill of the square
 * @param {Fill|Stroke|undefined} style2 Style for Stroke or Fill of the square
 */
var Square = function(size, style1, style2) {
	this._size		= (typeof(size) == 'number') ? size : 1;
	
	if (style1 === undefined && style2 === undefined) {
		throw "Cannot draw a square without both fill and stroke property";
	} else {
		if (style1 instanceof Stroke)
			this._stroke = style1;
		else
			this._fill = style1;
		
		if (style2 !== undefined) {
			if (style2 instanceof Stroke)
				this._stroke = style2;
			else
				this._fill = style2;
		}
	}
}


/* Getters and setters */

/**
 * Get or set the size of square
 * @method size
 * @param {number|undefined} size (set) Number to define size of square or (get) undefined to get the size
 * @return {Square|number} (set) Return a object reference or (get) return Size number
 */
Square.prototype.size = function(size) {
	if (size === undefined) return this._size;
	this._size = size;
	return this;
};

/**
 * Get or set the fill style of square
 * @method fill
 * @param {Fill|undefined} size (set) Fill style of the square or (get) undefined to get the fill style
 * @return {Square|Fill} (set) Return a object reference or (get) return the fill style
 */
Square.prototype.fill = function(fill) {
	if (fill === undefined) return this._fill;
	if (fill instanceof Fill)
		this._fill = fill;
	return this;
};

/**
 * Get or set the stroke style of square
 * @method stroke
 * @param {Stroke|undefined} stroke (set) Stroke style of the square or (get) undefined to get the stroke style
 * @return {Square|Stroke} (set) Return a object reference or (get) return the stroke style
 */
Square.prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	if (stroke instanceof Stroke)
		this._stroke = stroke;
	return this;
};


/* Drawable */

/**
 * Draw the square
 * @method draw
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {Vector2|Point2} position A point or vector object to define the position of the object
 * @param {boolean} centered True if the draw is based on the center or false if is based on the top left
 * @param {number|undefined} angle Rotation angle in radians on drawing square
 */
Square.prototype.draw = function(context, position, centered, angle) {
	var x0, y0,
		xf = position.x(),
		yf = position.y(),
		s  = this._size,
		hs = this._size / 2;
	
	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	if (centered) {
		x0 = -hs;
		y0 = -hs;
	} else {
		x0 = 0;
		y0 = 0;
	}
	context.beginPath();
	context.rect(-(hs), -(hs), s, s);
	
	if (this._fill)
		this._fill.html(context, position);
	
	if (this._stroke)
		this._stroke.html(context, position);
	
	context.restore();
}


/* Default operations */

/**
 * Clone the square to a new object
 * @method clone
 * @return {Square} Return a new object reference
 */
Square.prototype.clone = function() {
	return new Square(this._size, this._fill, this._stroke);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Square.prototype.serialize = function() {
	return '{ "size": ' + this._size + ', "fill":' + this._fill + ', "stroke":' + this._stroke + ' }';
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Square.prototype.toJson	= Square.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Square.prototype.toString	= Square.prototype.serialize;
