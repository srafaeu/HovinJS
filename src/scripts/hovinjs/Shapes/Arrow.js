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
 * @classdesc Arrow drawable shape
 * @class Arrow
 * @param {number} size Size of arrow
 * @param {Stroke} stroke Style for Stroke or Fill of the arrow
 */
var Arrow = function(size, stroke) {
	this._size = (typeof(size) == 'number') ? size : 1;
	
	if (stroke !== undefined && stroke instanceof Stroke) {
			this._stroke = stroke;
	} else {
		throw "Cannot draw a arrow without both fill and stroke property";
	}
}


/* Getters and setters */

/**
 * Get or set the length of arrow
 * @method size
 * @param {number|undefined} size (set) Number to define length of arrow or (get) undefined to get the size
 * @return {Arrow|number} (set) Return a object reference or (get) return Length of arrow
 */
Arrow.prototype.size = function(size) {
	if (size === undefined) return this._size;
	this._size = size;
	return this;
};

/**
 * Get or set the stroke style of arrow
 * @method stroke
 * @param {Stroke|undefined} stroke (set) Stroke style of the arrow or (get) undefined to get the stroke style
 * @return {Arrow|Stroke} (set) Return a object reference or (get) return the stroke style
 */
Arrow.prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	if (stroke instanceof Stroke)
		this._stroke = stroke;
	return this;
};


/* Drawable */

/**
 * Draw the arrow
 * @method draw
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {Vector2|Point2} position A point or vector object to define the position of the object
 * @param {boolean|Point2} pivot Boolean true to draw based on the center or false if is based on the top left or a Point2 object to define pivot point
 * @param {number|undefined} angle Rotation angle in radians on drawing arrow
 */
Arrow.prototype.draw = function(context, position, pivot, angle) {
	var s,
		p0 = new Point2(),
		xf = position.x(),
		yf = position.y(),
		hs = this._size / 2;
	
	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	if (pivot === true)
		p0 = new Point2(-hs, 0);
	else if (pivot instanceof Point2)
		p0 = new Point2(pivot.x(), 0);
	
	s = this._size + p0.x();
	
	context.beginPath();
	context.moveTo(p0.x(), p0.y());
	context.lineTo(s - 4, 0);
	context.closePath();
	
	if (this._stroke)
		this._stroke.html(context, position);
	
	// Draw arrow head
	context.beginPath();
	context.moveTo(s, 0);
	context.lineTo(s - 8, 4);
	context.lineTo(s - 8, -4);
	context.moveTo(s, 0);
	context.fillStyle = this._stroke.style().html(context, position);
	context.fill();
	
	
	context.restore();
}


/* Default operations */

/**
 * Clone the arrow to a new object
 * @method clone
 * @return {Arrow} Return a new object reference
 */
Arrow.prototype.clone = function() {
	return new Arrow(this._size, this._stroke);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Arrow.prototype.serialize = function() {
	return '{ "size": ' + this._size + ', "stroke":' + this._stroke + ' }';
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Arrow.prototype.toJson	= Arrow.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Arrow.prototype.toString	= Arrow.prototype.serialize;

