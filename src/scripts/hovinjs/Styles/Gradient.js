/* class Gradient */
var Gradient = function(start, end, stops) {
	this._start	= start || new Point2();
	this._end	= end || new Point2();
	this._stops	= stops || [];
};


/* Getters and Setters */

Gradient.prototype.start = function(start) {
	if (start === undefined) return this._start;
	this._start = start;
	return this;
};

Gradient.prototype.end = function(end) {
	if (end === undefined) return this._end;
	this._end = end;
	return this;
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

Gradient.prototype.stop = function(index, stop, color) {
	if (stop === undefined) return this._stops[index];
	this._stops[index] = {'stop': stop, 'color': color};
	return this;
};


/* Inserts */

Gradient.prototype.addColor = function (stop, color) {
	this._stops.push({'stop': stop, 'color': color});
};


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

