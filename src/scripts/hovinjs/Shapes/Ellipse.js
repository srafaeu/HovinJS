/*
	Description
	::public
	+	get e set Position
	+	get e set Size
	+	get e set Fill
	+	get e set Stroke
	+	draw
	+	__drawEllipse
	+	clone
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Ellipse drawable shape
 * @class Ellipse
 * @param {Vector2|Point2} position A point or vector object to define the initial position of the object
 * @param {Size} size Size (width, height) of ellipse
 * @param {Fill|Stroke} style1 Style for Stroke or Fill of the ellipse
 * @param {Fill|Stroke|undefined} style2 Style for Stroke or Fill of the ellipse
 */
var Ellipse = function(position, size, style1, style2) {
	this._position	= (position instanceof Vector2 || position instanceof Point2) ? new Vector2(position.x(), position.y()) : new Vector2(0, 0);
	this._size		= (size instanceof Size) ? size : new Size(0, 0);
	
	if (style1 === undefined && style2 === undefined) {
		throw "Cannot draw a ellipse without both fill and stroke property";
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
 * Get or set position of ellipse
 * @method position
 * @param {Vector2} start (set) A point object to define the position relative to canvas (get) undefined to get the position value
 * @return {Ellipse|Vector2} (set) Return a object reference or (get) return the position relative to canvas
 */
Ellipse.prototype.position = function(position) {
	if (position === undefined) return this._position;
	this._position = position;
	return this;
};

/**
 * Get or set the size of ellipse
 * @method size
 * @param {Size|undefined} size (set) Size object to define width and height of ellipse or (get) undefined to get the size
 * @return {Ellipse|Size} (set) Return a object reference or (get) return Size object
 */
Ellipse.prototype.size = function(size) {
	if (size === undefined) return this._size;
	this._size = size;
	return this;
};

/**
 * Get or set the fill style of ellipse
 * @method fill
 * @param {Fill|undefined} size (set) Fill style of the ellipse or (get) undefined to get the fill style
 * @return {Ellipse|Fill} (set) Return a object reference or (get) return the fill style
 */
Ellipse.prototype.fill = function(fill) {
	if (fill === undefined) return this._fill;
	if (fill instanceof Fill)
		this._fill = fill;
	return this;
};

/**
 * Get or set the stroke style of ellipse
 * @method stroke
 * @param {Stroke|undefined} stroke (set) Stroke style of the ellipse or (get) undefined to get the stroke style
 * @return {Ellipse|Stroke} (set) Return a object reference or (get) return the stroke style
 */
Ellipse .prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	if (stroke instanceof Stroke)
		this._stroke = stroke;
	return this;
};


/* Drawable */

/**
 * Draw the ellipse
 * @method draw
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {number|undefined} angle Rotation angle in radians on drawing ellipse
 */
Ellipse.prototype.draw = function(context, angle) {
	var xf = this._position.x(),
		yf = this._position.y(),
		w = this._size.width(),
		h = this._size.height();
	
	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	this.__drawEllipse(context, -(w / 2), -(h / 2), w, h);
	
	if (this._fill)
		this._fill.html(context, this._position);
	
	if (this._stroke)
		this._stroke.html(context, this._position);
	
	context.restore();
}

/**
 * Hidden method for draw an ellipse
 * @method __drawEllipse
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {number|undefined} angle Rotation angle in radians on drawing ellipse
 */
Ellipse.prototype.__drawEllipse = function(context, x, y, w, h) {
	var kappa = .5522848;
	var ox = (w / 2) * kappa; // control Point2 offset horizontal
	var oy = (h / 2) * kappa; // control Point2 offset vertical
	var xe = x + w;           // x-end
	var ye = y + h;           // y-end
	var xm = x + w / 2;       // x-middle
	var ym = y + h / 2;       // y-middle

	context.beginPath();
	context.moveTo(x, ym);
	context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	context.closePath();
}



/* Default operations */

/**
 * Clone the ellipse to a new object
 * @method clone
 * @return {Ellipse} Return a new object reference
 */
Ellipse.prototype.clone = function() {
	return new Ellipse(this._position, this._size, this._fill, this._stroke);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Ellipse.prototype.serialize = function() {
	return '{ "position":"' + this._position + '", "size": ' + this._size + ', "fill":' + this._fill + ', "stroke":' + this._stroke + ' }';
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Ellipse.prototype.toJson	= Ellipse.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Ellipse.prototype.toString	= Ellipse.prototype.serialize;



