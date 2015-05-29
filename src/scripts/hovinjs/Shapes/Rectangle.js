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
 * @classdesc Rectangle drawable shape
 * @class Rectangle
 * @param {Vector2|Point2} position A point or vector object to define the initial position of the object
 * @param {Size} size Size (width, height) of rectangle
 * @param {Fill|Stroke} style1 Style for Stroke or Fill of the rectangle
 * @param {Fill|Stroke|undefined} style2 Style for Stroke or Fill of the rectangle
 */
var Rectangle = function(position, size, style1, style2) {
	if (position instanceof Vector2 || position instanceof Point2)
		this._position = new Vector2(position.x(), position.y());
	else
		this._position = new Vector2(0, 0);
	
	if (size instanceof Size)
		this._size = size
	else
		this._size = new Size(0, 0);
	
	
	if (style1 === undefined && style2 === undefined) {
		throw "Cannot draw a rectangle without both fill and stroke property";
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
 * Get or set position of rectangle
 * @method position
 * @param {Vector2} start (set) A point object to define the position relative to canvas (get) undefined to get the position value
 * @return {Rectangle|Vector2} (set) Return a object reference or (get) return the position relative to canvas
 */
Rectangle.prototype.position = function(position) {
	if (position === undefined) return this._position;
	this._position = position;
	return this;
};

/**
 * Get or set the size of rectangle
 * @method size
 * @param {Size|undefined} size (set) Size object to define width and height of rectangle or (get) undefined to get the size
 * @return {Rectangle|Size} (set) Return a object reference or (get) return Size object
 */
Rectangle.prototype.size = function(size) {
	if (size === undefined) return this._size;
	this._size = size;
	return this;
};

/**
 * Get or set the fill style of rectangle
 * @method fill
 * @param {Fill|undefined} size (set) Fill style of the rectangle or (get) undefined to get the fill style
 * @return {Rectangle|Fill} (set) Return a object reference or (get) return the fill style
 */
Rectangle.prototype.fill = function(fill) {
	if (fill === undefined) return this._fill;
	if (fill instanceof Fill)
		this._fill = fill;
	return this;
};

/**
 * Get or set the stroke style of rectangle
 * @method stroke
 * @param {Stroke|undefined} stroke (set) Stroke style of the rectangle or (get) undefined to get the stroke style
 * @return {Rectangle|Stroke} (set) Return a object reference or (get) return the stroke style
 */
Rectangle.prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	if (stroke instanceof Stroke)
		this._stroke = stroke;
	return this;
};


/* Drawable */

/**
 * Draw the rectangle
 * @method draw
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {number|undefined} angle Rotation angle in radians on drawing rectangle
 */
Rectangle.prototype.draw = function(context, angle) {
	var xf = this._position.x(),
		yf = this._position.y(),
		w = this._size.width(),
		h = this._size.height();
	
	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	context.beginPath();
	context.rect(-(w / 2), -(h / 2), w, h);
	
	if (this._fill)
		this._fill.html(context, this._position);
	
	if (this._stroke)
		this._stroke.html(context, this._position);
	
	context.restore();
}


/* Default operations */

/**
 * Clone the rectangle to a new object
 * @method clone
 * @return {Rectangle} Return a new object reference
 */
Rectangle.prototype.clone = function() {
	return new Rectangle(this._position, this._size, this._fill, this._stroke);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Rectangle.prototype.serialize = function() {
	return '{ "position":"' + this._position + '", "size": ' + this._size + ', "fill":' + this._fill + ', "stroke":' + this._stroke + ' }';
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Rectangle.prototype.toJson	= Rectangle.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Rectangle.prototype.toString	= Rectangle.prototype.serialize;

