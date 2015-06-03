/*
	Description
	::public
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
 * @param {Size} size Size (width, height) of rectangle
 * @param {number} sides Number of sides of polygon
 * @param {Fill|Stroke} style1 Style for Stroke or Fill of the polygon
 * @param {Fill|Stroke|undefined} style2 Style for Stroke or Fill of the polygon
 */
var Polygon = function(size, sides, style1, style2) {
	this._sides = (typeof(sides) == 'number') ? sides : 3;
	
	if (size instanceof Size) 
		this._size = size;
	else if (typeof(size) == 'number')
		this._size = new Size(size, size);
	else
		this._size = new Size(0, 0);
	
	if (style1 === undefined && style2 === undefined) {
		throw "Cannot draw a polygon without both fill and stroke property";
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
		hw = this._size.width() / 2,
		hh = this._size.height() / 2;
	
	this._points = [];
	
	for (i = 0, l = this._sides; i < l; ++i) {
        rotatedAngle = (i * (2 * Math.PI)) / l;
        x = (hw * Math.cos(rotatedAngle));
        y = (hh * Math.sin(rotatedAngle));
		
        this._points.push(new Point2(x, y));
    }
}



/* Drawable */

/**
 * Draw the polygon
 * @method draw
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {Vector2|Point2} position A point or vector object to define the position of the object
 * @param {boolean|Point2} pivot Boolean true to draw based on the center or false if is based on the top left or a Point2 object to define pivot point
 * @param {number|undefined} angle Rotation angle in radians on drawing polygon
 */
Polygon.prototype.draw = function(context, position, pivot, angle) {
	var i, l,
		p0 = new Point2(),
		xf = position.x(),
		yf = position.y(),
		w = this._size.width(),
		h = this._size.height(),
		hw = w / 2,
		hh = h / 2;
		
	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	if (pivot === false)
		p0 = new Point2(hw, hh);
	else if (pivot instanceof Point2)
		p0 = new Point2(pivot.x(), pivot.y());
	
	context.beginPath();
	context.moveTo(this._points[0].x() + p0.x(), this._points[0].y() + p0.y());
	
	for (i = 1, l = this._points.length; i < l; i++)
		context.lineTo(this._points[i].x() + p0.x(), this._points[i].y() + p0.y());
	
	context.closePath();
	
	if (this._fill)
		this._fill.html(context, position);
	
	if (this._stroke)
		this._stroke.html(context, position);
	
	context.restore();
}


/* Default operations */

/**
 * Clone the polygon to a new object
 * @method clone
 * @return {Polygon} Return a new object reference
 */
Polygon.prototype.clone = function() {
	return new Polygon(this._size, this._sides, this._fill, this._stroke);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Polygon.prototype.serialize = function() {
	return '{ "size": ' + this._size + '", "sides": ' + this._sides + ', "fill":' + this._fill + ', "stroke":' + this._stroke + ' }';
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

