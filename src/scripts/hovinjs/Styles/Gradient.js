/*
	Description
	::public
	+	get e set Start
	+	get e set End
	+	get e set Stop
		addColor
		toRGBA
		toHex
		clone
		serialize / toJSON / toString

	::static
*/

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
 * @method start
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
 * @method end
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
 * @method end
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

Gradient.prototype.addColor = function (stop, color) {
	if (color == undefined && stop instanceof GradientStop)
		this._stops.push(stop);
	else if (typeof(stop) == 'number' && color instanceof Color)
		this._stops.push(new GradientStop(stop, color));
};



/* Html */

Gradient.prototype.html = function(context, startPoint2) {
	var i, grd;
	var x = this._start.x();
	var y = this._start.y();
	
	if (startPoint2 !== undefined) {
		x += startPoint2.x();
		y += startPoint2.y();
	}
	
	grd	= context.createLinearGradient(x, y, x + this._end.x(), y + this._end.y());
	
	for (var i = 0; i < this._stops.length; i++) {
		stop = this._stops[i];
		grd.addColorStop(stop.stop, stop.color.toHex());
	}
	
	return grd;
}


/* Serialization */

Gradient.prototype.stopsToJson = 
Gradient.prototype.stopsToString = function() {
	var txt = "[";

	for (var i = 0; i < this._stops.length; i++)
		txt += "{ stop: " + this._stops[i].stop + ", color: " + this._stops[i].color + " }";

	txt += "]";
	return txt;
};

Gradient.prototype.toJson = 
Gradient.prototype.toString = 
Gradient.prototype.serialize = function() {
	return "{ start: " + this._start.toString() + ", end: " + this._start.toString() + ", stops: " + this.stopsToJson() + " }";
};

