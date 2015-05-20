var Path = function(start, stroke, points) {
	this._start = start || new Point2(0, 0);
	this._points = [];
	
	if (points !== undefined && points instanceof Array)
		this._points = points;
	
	if (stroke === undefined)
		throw "Cannot draw a Path without a stroke property";
	else
		this._stroke = stroke;
}


/* Getters and setters */

Path.prototype.start = function(start) {
	if (start === undefined) return this._start;
	this._start = start;
	return this;
};

Path.prototype.size = function() {
	return this._points.length;
};

Path.prototype.point = function(index) {
	if (index < this._points.length)
		return this._points[index];
};

Path.prototype.points = function() {
	return this._points;
};

Path.prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	this._stroke = stroke;
	return this;
};


/* Inserts */

Path.prototype.add = function(point) {
	if (point instanceof Point2)
		this._points.push(point);
	return this;
};

Path.prototype.insert = function (index, point) {
	this._points.splice(index, 0, point);
	return this;
};

Path.prototype.remove = function (index) {
	var point = this._points.splice(index, 1);
	return point;
};


/* Drawable */

Path.prototype.draw = function(context) {
	context.beginPath();
	context.moveTo(this._start.x(), this._start.y());
	
	for (var i = 0; i < this._points.length; i++)
		context.lineTo(this._points[i].x(), this._points[i].y());
	
	if (this._stroke) {
		context.lineWidth	= this._stroke.width();
		context.strokeStyle	= this._stroke.style().html(context, this._position);
		context.stroke();
	}
}


/* Serialization */

Color.prototype.toJson = 
Color.prototype.toString = 
Color.prototype.serialize = function() {
	return "{ start: " + this._start + ", stroke: " + this._stroke + ", point: " + this._points + " }";
}
