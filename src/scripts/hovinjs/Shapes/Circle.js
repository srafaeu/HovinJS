/*
	Description
	::public
	+	get e set Position
	+	get e set Radius
	+	get e set Fill
	+	get e set Stroke
	+	draw
	+	clone
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Circle drawable shape
 * @class Circle
 * @param {Vector2|Point2} position A point or vector object to define the initial position of the object
 * @param {number} radius Radius of circle to determine its size
 * @param {Fill|Stroke} style1 Style for Stroke or Fill of the circle
 * @param {Fill|Stroke|undefined} style2 Style for Stroke or Fill of the circle
 */
var Circle = function(position, radius, style1, style2) {
	this._position	= (position instanceof Vector2 || position instanceof Point2) ? new Vector2(position.x(), position.y()) : new Vector2(0, 0);
	this._radius	= (typeof(radius) == 'number') ? radius : 1;
	
	if (style1 === undefined && style2 === undefined) {
		throw "Cannot draw a circle without both fill and stroke property";
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
 * Get or set position of circle
 * @method position
 * @param {Vector2} start (set) A point object to define the position relative to canvas (get) undefined to get the position value
 * @return {Circle|Vector2} (set) Return a object reference or (get) return the position relative to canvas
 */
Circle.prototype.position = function(position) {
	if (position === undefined) return this._position;
	this._position = position;
	return this;
};

/**
 * Get or set the radius of circle
 * @method radius
 * @param {number|undefined} radius (set) Number to define radius of circle or (get) undefined to get the radius
 * @return {Circle|number} (set) Return a object reference or (get) return radius of the circl
 */
Circle.prototype.radius = function(radius) {
	if (radius === undefined) return this._radius;
	this._radius = radius;
	return this;
};

/**
 * Get or set the fill style of circle
 * @method fill
 * @param {Fill|undefined} size (set) Fill style of the circle or (get) undefined to get the fill style
 * @return {Circle|Fill} (set) Return a object reference or (get) return the fill style
 */
Circle.prototype.fill = function(fill) {
	if (fill === undefined) return this._fill;
	if (fill instanceof Fill)
		this._fill = fill;
	return this;
};

/**
 * Get or set the stroke style of circle
 * @method stroke
 * @param {Stroke|undefined} stroke (set) Stroke style of the circle or (get) undefined to get the stroke style
 * @return {Circle|Stroke} (set) Return a object reference or (get) return the stroke style
 */
Circle.prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	if (stroke instanceof Stroke)
		this._stroke = stroke;
	return this;
};


/* Drawable */

/**
 * Draw the circle
 * @method draw
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {number|undefined} angle Rotation angle in radians on drawing circle
 */
Circle.prototype.draw = function(context, angle) {
	var xf = this._position.x(),
		yf = this._position.y();
	
	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	context.beginPath();
    context.arc(0, 0, this._radius, 0, Math.PI * 2, false);
	
	if (this._fill)
		this._fill.html(context, this._position);
	
	if (this._stroke)
		this._stroke.html(context, this._position);
	
	context.restore();
}


/* Default operations */

/**
 * Clone the circle to a new object
 * @method clone
 * @return {Circle} Return a new object reference
 */
Circle.prototype.clone = function() {
	return new Circle(this._position, this._radius, this._fill, this._stroke);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Circle.prototype.serialize = function() {
	return '{ "position":"' + this._position + '", "radius": ' + this._radius + ', "fill":' + this._fill + ', "stroke":' + this._stroke + ' }';
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Circle.prototype.toJson	= Circle.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Circle.prototype.toString	= Circle.prototype.serialize;

