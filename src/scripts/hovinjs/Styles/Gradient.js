/**
 * @classdesc Linear gradient color object with two or more steps
 * @class Gradient
 * @param {Point2} start A point object to define the start gradient position relative to canvas 
 * @param {Point2} end A point object to define the stop gradient position relative to canvas
 * @param {GradientStop[]|undefined} stops An array of GradientStops to define Gradient or undefined for add stops after
 */
var Gradient = function(start, end, stops) {
	this._start	= start || new Point2();
	this._end	= end || new Point2();
	this._stops	= stops || [];
};


/* Getters and Setters */

/**
 * Get or set start position of gradient
 * @param {Point2} start (set) A point object to define the start gradient position relative to canvas (get) undefined to get the start value
 * @return {Gradient|Point2} (set) Return a object reference or (get) return the start gradient position relative to canvas
 */
Gradient.prototype.start = function(start) {
	if (start === undefined) return this._start;
	this._start = start;
	return this;
};

/**
 * Get or set end position of gradient
 * @param {Point2} end (set) A point object to define the end gradient position relative to canvas (get) undefined to get the end value
 * @return {Gradient|Point2} (set) Return a object reference or (get) return the end gradient position relative to canvas
 */
Gradient.prototype.end = function(end) {
	if (end === undefined) return this._end;
	this._end = end;
	return this;
};

/**
 * Get or set an GradientStop in the stops array
 * @param {number} index Index position on the stops array
 * @param {GradientStop[]|undefined} stop (set) A GradientStops to define gradient new color or (get) undefined to get the stop in the index position
 * @return {Gradient|Point2} (set) Return a object reference or (get) return the end gradient position relative to canvas
 */
Gradient.prototype.stop = function(index, stop) {
	if (index > this._stops.length)
		return this;
	if (stop === undefined) return this._stops[index];
	this._stops[index] = stop;
	return this;
};


/* Inserts */

/**
 * Add a GradientStop to the gradient
 * @param {GradientStop|number} stop A GradientStop object or a number of a new stop position
 * @param {Color|undefined} color A color reference to a new stop position or undefined for add a GradientStop object
 */
Gradient.prototype.addColor = function (stop, color) {
	if (color == undefined && stop instanceof GradientStop)
		this._stops.push(stop);
	else if (typeof(stop) == 'number' && color instanceof Color)
		this._stops.push(new GradientStop(stop, color));
};

/**
 * Remove a GradientStop of the gradient
 * @param {number} stop A GradientStop object or a number of a new stop position
 * @param {Color|undefined} color A color reference to a new stop position or undefined for GradientStop 
 */
Gradient.prototype.removeColor = function (index) {
	return this._stops.splice(index, 1);
};


/* Html */

/**
 * Create a CanvasGradient to use as fill or stroke style
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {Point2|Vector2|undefined} position Start position as Point2 or Vector2 for move current gradient or undefined to use current start position
 * @return {CanvasGradient} Return a CanvasGradient object to use as style
 */
Gradient.prototype.html = function(context, startPosition) {
	var i, grd,
		x = this._start.x(),
		y = this._start.y();
	
	if (startPosition !== undefined && startPosition instanceof Point2 || startPosition instanceof Vector2) {
		x += startPosition.x();
		y += startPosition.y();
	}
	
	grd	= context.createLinearGradient(x, y, x + this._end.x(), y + this._end.y());
	
	for (i = 0; i < this._stops.length; i++)
		grd.addColorStop(this._stops[i].stop(), this._stops[i].color().toHex());
	
	return grd;
}


/* Default operations */

/**
 * Clone the GradientStop to a new object
 * @return {GradientStop} Return a new object reference
 */
GradientStop.prototype.clone = function() {
	return new Gradient(this._start, this._end, this._stops);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Gradient.prototype.serialize = function() {
	return "{ start: " + this._start + ", end: " + this._end + ", stops: " + this._end + " }";
};

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Gradient.prototype.toJson = Gradient.prototype.serialize;

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Gradient.prototype.toString = Gradient.prototype.serialize;
