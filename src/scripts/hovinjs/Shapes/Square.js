/*
	Description
	::public
	+	get e set Position
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
 * @param {Vector2|Point2} position A point or vector object to define the initial position of the object
 * @param {number} size Size of square
 * @param {Fill|Stroke} style1 Style for Stroke or Fill of the square
 * @param {Fill|Stroke|undefined} style2 Style for Stroke or Fill of the square
 */
var Square = function(position, size, style1, style2) {
	this._position	= (position instanceof Vector2 || position instanceof Point2) ? new Vector2(position.x(), position.y()) : new Vector2(0, 0);
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
 * Get or set position of square
 * @method position
 * @param {Vector2} start (set) A point object to define the position relative to canvas (get) undefined to get the position value
 * @return {Square|Vector2} (set) Return a object reference or (get) return the position relative to canvas
 */
Square.prototype.position = function(position) {
	if (position === undefined) return this._position;
	this._position = position;
	return this;
};

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
 * @param {number|undefined} angle Rotation angle in radians on drawing square
 */
Square.prototype.draw = function(context, angle) {
	var xf = this._position.x(),
		yf = this._position.y(),
		s  = this._size,
		hs = this._size / 2;
	
	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	context.beginPath();
	context.rect(-(hs), -(hs), s, s);
	
	if (this._fill)
		this._fill.html(context, this._position);
	
	if (this._stroke)
		this._stroke.html(context, this._position);
	
	context.restore();
}


/* Default operations */

/**
 * Clone the square to a new object
 * @method clone
 * @return {Square} Return a new object reference
 */
Square.prototype.clone = function() {
	return new Square(this._position, this._size, this._fill, this._stroke);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Square.prototype.serialize = function() {
	return '{ "position":"' + this._position + '", "size": ' + this._size + ', "fill":' + this._fill + ', "stroke":' + this._stroke + ' }';
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




/* Drawable

Square.prototype.draw = function(context) {
	var x = this._position.x();
	var y = this._position.y();
	
	context.beginPath();
	context.rect(x, y, this._size, this._size)
	
	if (this._fill) {
		context.fillStyle = this._fill.html(context, this._position);
		context.fill();
	}
	if (this._stroke) {
		context.lineWidth	= this._stroke.width();
		context.strokeStyle	= this._stroke.style().html(context);
		context.stroke();
	}
}
 */