var Rectangle = function(position, size, style1, style2) {
	this._position = position || new Point2(0, 0);
	this._size = size || new Size(0, 0);

	if (style1 === undefined) {
		throw "Cannot draw a rectangle without both fill and stroke property";
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

Rectangle.prototype.position = function(position) {
	if (position === undefined) return this._position;
	this._position = position;
	return this;
};

Rectangle.prototype.size = function(size) {
	if (size === undefined) return this._size;
	this._size = size;
	return this;
};

Rectangle.prototype.fill = function(fill) {
	if (fill === undefined) return this._fill;
	this._fill = fill;
	return this;
};

Rectangle.prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	this._stroke = stroke;
	return this;
};


/* Drawable */

Rectangle.prototype.draw = function(context) {
	var x = this._position.x();
	var y = this._position.y();
	
	context.beginPath();
	context.rect(x, y, this._size.width(), this._size.height())
	
	if (this._fill) {
		context.fillStyle = this._fill.html(context, this._position);
		context.fill();
	}
	if (this._stroke) {
		context.lineWidth	= this._stroke.width();
		context.strokeStyle	= this._stroke.style().html(context, this._position);
		context.stroke();
	}
}
