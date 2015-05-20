var Polygon = function(position, radius, sides, rotation, style1, style2) {
	this._position	= position || new Point2(0, 0);
	this._radius	= radius || 0;
	this._sides		= sides || 0;
	this._rotation	= rotation || 0.0;
	this._points	= [];

	if (style1 === undefined) {
		throw "Cannot draw a Polygon without both fill and stroke property";
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

Polygon.prototype.position = function(position) {
	if (position === undefined) return this._position;
	this._position = position;
	return this;
};

Polygon.prototype.radius = function(radius) {
	if (radius === undefined) return this._radius;
	this._radius = radius;
	return this;
};

Polygon.prototype.rotation = function(rotation) {
	if (rotation === undefined) return this._rotation;
	this._rotation = rotation;
	return this;
};


Polygon.prototype.sides = function(sides) {
	if (sides === undefined) return this._sides;
	this._sides = sides;
	return this;
};

Polygon.prototype.fill = function(fill) {
	if (fill === undefined) return this._fill;
	this._fill = fill;
	return this;
};

Polygon.prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	this._stroke = stroke;
	return this;
};


Polygon.prototype.__build = function() {
    var rotatedAngle, x, y;
	var angle = Math.PI * ((1 / this._sides) - (1 / 2));
	
	angle += this._rotation;
    
	var points = [];
    for (var i = 0; i < this._sides; ++i) {
        rotatedAngle = angle + (i * 2 * Math.PI / this._sides);
        x = this._position.x() + (this._radius * Math.cos(rotatedAngle));
        y = this._position.y() + (this._radius * Math.sin(rotatedAngle));
		
        points.push(new Point2(x, y));
    }
	return points;
}


/* Drawable */

Polygon.prototype.draw = function(context) {
	var points = this.__build();
	var x = points[0].x();
	var y = points[0].y();
	
	context.beginPath();
	context.moveTo(x, y);
	for (var i = 0; i < points.length; i++)
		context.lineTo(points[i].x(), points[i].y());
	context.closePath();
	
	if (this._fill) {
		context.fillStyle = this._fill.html(context, this._position);
		context.fill();
	}
	if (this._stroke) {
		context.lineWidth	= this._stroke.width();
		context.strokeStyle	= this._stroke.style().html(context);
		context.stroke();
	}
}
