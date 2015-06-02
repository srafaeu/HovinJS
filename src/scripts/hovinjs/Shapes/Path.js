/*
	Description
	::public
	+	get e set Position
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
 * @param {Vector2|Point2} position A point or vector object to define the initial position of the object
 * @param {Stroke} stroke Style for stroke of path lines
 * @param {Point2[]|undefined} points Array of points to draw a path line
 */
var Path = function(position, stroke, points) {
	this._position = position || new Vector2(0, 0);
	this._points = [];
	
	if (points !== undefined && points instanceof Array)
		this._points = points;
	
	if (stroke !== undefined && stroke instanceof Stroke) {
		this._stroke = stroke;
	} else {
		throw "Cannot draw a path without both fill and stroke property";
	}
}


/* Getters and setters */

/**
 * Get or set position of path
 * @method position
 * @param {Vector2} position (set) A point object to define the position relative to canvas (get) undefined to get the position value
 * @return {Path|Vector2} (set) Return a object reference or (get) return the position relative to canvas
 */
Path.prototype.position = function(position) {
	if (position === undefined) return this._position;
	this._position = position;
	return this;
};

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
	if (point instanceof Point2)
		this._points.push(point);
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
 * @param {number|undefined} angle Rotation angle in radians on drawing path
 */
Path.prototype.draw = function(context, angle) {
	var xf = this._position.x(),
		yf = this._position.y();
	
	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	context.beginPath();
	context.moveTo(0, 0);
	
	for (var i = 0; i < this._points.length; i++)
		context.lineTo(this._points[i].x(), this._points[i].y());
	
	if (this._stroke)
		this._stroke.html(context, this._position);
	
	context.closePath();
	context.restore();
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