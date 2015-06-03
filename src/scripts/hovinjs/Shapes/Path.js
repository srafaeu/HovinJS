/*
	Description
	::public
	+	get e set Stroke
	+	get e set Point
	+	get e set Points
	+	add
	+	insert
	+	remove
	+	draw
	+	clone
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Path drawable shape
 * @class Path
 * @param {Stroke} stroke Style for stroke of path lines
 * @param {Point2[]|undefined} points Array of points to draw a path line
 */
var Path = function(stroke, points) {
	this._points = [];
	this._size = new Size();
	
	if (points !== undefined && points instanceof Array) {
		this._points = points;
		this._size = this.__getSize();
	}
	if (stroke !== undefined && stroke instanceof Stroke) {
		this._stroke = stroke;
	} else {
		throw "Cannot draw a path without both fill and stroke property";
	}
}


/* Getters and setters */

/**
 * Get a specified point of Path
 * @method point
 * @param {number} index Number to reference which point get from array
 * @return {Point2} Specified point from Path or undefined if index is invalid
 */
Path.prototype.point = function(index) {
	if (index < this._points.length)
		return this._points[index];
	return undefined;
};

/**
 * Get array of points
 * @method points
 * @return {Point2[]} Array of points from path
 */
Path.prototype.points = function() {
	return this._points;
};

/**
 * Get or set the stroke style of path
 * @method stroke
 * @param {Stroke|undefined} stroke (set) Stroke style of the path or (get) undefined to get the stroke style
 * @return {Path|Stroke} (set) Return a object reference or (get) return the stroke style
 */
Path.prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	this._stroke = stroke;
	return this;
};


/* Inserts */

/**
 * Add a point to the path
 * @method add
 * @param {Point2} point A new Point2 object to path
 * @return {Path} Return a object reference
 */
Path.prototype.add = function(point) {
	if (point instanceof Point2) {
		this._points.push(point);
		this._size = this.__getSize();
	}
	return this;
};

/**
 * Add a point to a specified index in the path
 * @method insert
 * @param {number} index Index to the path array
 * @param {Point2} point A new Point2 object to path
 * @return {Path} Return a object reference
 */
Path.prototype.insert = function (index, point) {
	if (index > this._points.length)
		this._points.push(point);
	else
		this._points.splice(index, 0, point);
	
	this._size = this.__getSize();
	
	return this;
};

/**
 * Remove a point from a specified index in the path
 * @method remove
 * @param {number} index Index to the path array
 * @return {Point2} Return the removed point or undefined if index is out of array
 */
Path.prototype.remove = function (index) {
	if (index > this._points.length)
		return this._points.splice(index, 1);
	return undefined;
};


/* Drawable */

/**
 * Draw the path
 * @method draw
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {Vector2|Point2} position A point or vector object to define the position of the object
 * @param {boolean|Point2} pivot Boolean true to draw based on the center or false if is based on the top left or a Point2 object to define pivot point
 * @param {number|undefined} angle Rotation angle in radians on drawing path
 */
Path.prototype.draw = function(context, position, pivot, angle) {
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
	
	if (pivot === true)
		p0 = new Point2(-hw, -hh);
	else if (pivot instanceof Point2)
		p0 = new Point2(pivot.x(), pivot.y());
	
	context.beginPath();
	context.moveTo(p0.x(), p0.y());
	
	for (i = 0, l = this._points.length; i < l; i++)
		context.lineTo(this._points[i].x() + p0.x(), this._points[i].y() +  p0.y());
	
	if (this._stroke)
		this._stroke.html(context, this._position);
	
	context.closePath();
	context.restore();
}

/**
 * Hidden method to get the size of path 
 * @method __getSize
 */
Path.prototype.__getSize = function() {
	var x, y,
		minx = 1000,
		miny = 1000,
		maxx = -1000,
		maxy = -1000;
	
	for (i = 0, l = this._points.length; i < l; i++) {
		x = this._points[i].x();
		y = this._points[i].y();
		
		if (minx > x) minx = x;
		if (miny > y) miny = y;
		
		if (maxx < x) maxx = x;
		if (maxy < y) maxy = y;
	}
	
	return new Size(maxx - minx, maxy - miny)
}


/* Default operations */

/**
 * Clone the path to a new object
 * @method clone
 * @return {Path} Return a new object reference
 */
Path.prototype.clone = function() {
	return new Path(this._position, this._stroke, this._points);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Path.prototype.serialize = function() {
	return '{ "position":"' + this._position + ', "stroke":' + this._stroke + '", "points": ' + this._points + ' }';
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Path.prototype.toJson	= Path.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Path.prototype.toString	= Path.prototype.serialize;

