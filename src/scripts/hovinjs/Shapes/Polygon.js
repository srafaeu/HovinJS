/*
	Description
	::public
	+	get e set Position
	+	get e set Size
	+	get e set Sides
	+	get e set Fill
	+	get e set Stroke
	+	__build
	+	draw
	+	clone
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Polygon drawable shape
 * @class Polygon
 * @param {Vector2|Point2} position A point or vector object to define the initial position of the object
 * @param {Size} size Size (width, height) of rectangle
 * @param {number} sides Number of sides of polygon
 * @param {Fill|Stroke} style1 Style for Stroke or Fill of the polygon
 * @param {Fill|Stroke|undefined} style2 Style for Stroke or Fill of the polygon
 */
var Polygon = function(position, size, sides, style1, style2) {
	this._position	= (position instanceof Vector2 || position instanceof Point2) ? new Vector2(position.x(), position.y()) : new Vector2(0, 0);
	this._sides		= (typeof(sides) == 'number') ? sides : 3;
	
	if (size instanceof Size) 
		this._size = size;
	else if (typeof(size) == 'number')
		this._size = new Size(size, size);
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
	
	this.__build();
}


/* Getters and setters */

/**
 * Get or set position of polygon
 * @method position
 * @param {Vector2} start (set) A point object to define the position relative to canvas (get) undefined to get the position value
 * @return {Polygon|Vector2} (set) Return a object reference or (get) return the position relative to canvas
 */
Polygon.prototype.position = function(position) {
	if (position === undefined) return this._position;
	this._position = position;
	return this;
};

/**
 * Get or set the size of polygon
 * @method size
 * @param {Size|undefined} size (set) Size object to define width and height of polygon or (get) undefined to get the size
 * @return {Polygon|Size} (set) Return a object reference or (get) return Size object
 */
Polygon.prototype.size = function(size) {
	if (size === undefined) return this._size;
	this._size = size;
	return this;
};

/**
 * Get or set the sides number of polygon
 * @method sides
 * @param {number|undefined} sides (set) Number to define sides of polygon or (get) undefined to get the sides number
 * @return {Polygon|number} (set) Return a object reference or (get) return sides number
 */
Polygon.prototype.sides = function(sides) {
	if (sides === undefined) return this._sides;
	this._sides = sides;
	return this;
};

/**
 * Get or set the fill style of polygon
 * @method fill
 * @param {Fill|undefined} size (set) Fill style of the polygon or (get) undefined to get the fill style
 * @return {Polygon|Fill} (set) Return a object reference or (get) return the fill style
 */
Polygon.prototype.fill = function(fill) {
	if (fill === undefined) return this._fill;
	if (fill instanceof Fill)
		this._fill = fill;
	return this;
};

/**
 * Get or set the stroke style of polygon
 * @method stroke
 * @param {Stroke|undefined} stroke (set) Stroke style of the polygon or (get) undefined to get the stroke style
 * @return {Polygon|Stroke} (set) Return a object reference or (get) return the stroke style
 */
Polygon.prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	if (stroke instanceof Stroke)
		this._stroke = stroke;
	return this;
};


/**
 * Hidden method to build array of points to draw the polygon
 */
Polygon.prototype.__build = function() {
    var i, l, rotatedAngle, x, y,
		w = this._size.width(),
		h = this._size.height(),
		angle = -Math.PI * ((1 / this._sides) - (1 / 2));
	
	this._points = [];
	
	for (i = 0, l = this._sides; i < l; ++i) {
        rotatedAngle = angle + (i * 2 * Math.PI / this._sides);
        x = (w * Math.cos(rotatedAngle));
        y = (h * Math.sin(rotatedAngle));
		
        this._points.push(new Point2(x, y));
    }
}



/* Drawable */

/**
 * Draw the polygon
 * @method draw
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {number|undefined} angle Rotation angle in radians on drawing polygon
 */
Polygon.prototype.draw = function(context, angle) {
	var i, l,
		xf = this._position.x(),
		yf = this._position.y();
	
	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	context.beginPath();
	context.moveTo(this._points[0].x(), this._points[0].y());
	
	for (i = 1, l = this._points.length; i < l; i++)
		context.lineTo(this._points[i].x(), this._points[i].y());
	
	context.closePath();
	
	if (this._fill)
		this._fill.html(context, this._position);
	
	if (this._stroke)
		this._stroke.html(context, this._position);
	
	context.restore();
}


/* Default operations */

/**
 * Clone the polygon to a new object
 * @method clone
 * @return {Polygon} Return a new object reference
 */
Polygon.prototype.clone = function() {
	return new Polygon(this._position, this._size, this._sides, this._fill, this._stroke);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Polygon.prototype.serialize = function() {
	return '{ "position":"' + this._position + '", "size": ' + this._size + '", "sides": ' + this._sides + ', "fill":' + this._fill + ', "stroke":' + this._stroke + ' }';
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Polygon.prototype.toJson	= Polygon.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Polygon.prototype.toString	= Polygon.prototype.serialize;

