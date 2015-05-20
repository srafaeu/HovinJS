var Ellipse = function(position, size, style1, style2) {
	this._position = position || new Point2(0, 0);
	this._size = size || new Size(0, 0);

	if (style1 === undefined) {
		throw "Cannot draw an Ellipse without both fill and stroke property";
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

Ellipse.prototype.position = function(position) {
	if (position === undefined) return this._position;
	this._position = position;
	return this;
};

Ellipse.prototype.size = function(size) {
	if (size === undefined) return this._size;
	this._size = size;
	return this;
};

Ellipse.prototype.fill = function(fill) {
	if (fill === undefined) return this._fill;
	this._fill = fill;
	return this;
};

Ellipse.prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	this._stroke = stroke;
	return this;
};


/* Drawable */

Ellipse.prototype.draw = function(context) {
	var x = this._position.x();
	var y = this._position.y();
	
	this.__drawEllipseByCenter(context, x, y, this._size.width(), this._size.height());
	
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

Ellipse.prototype.__drawEllipseByCenter = function(ctx, cx, cy, w, h) {
	this.__drawEllipse(ctx, cx - w/2.0, cy - h/2.0, w, h);
}

Ellipse.prototype.__drawEllipse = function(ctx, x, y, w, h) {
	var kappa = .5522848;
	var ox = (w / 2) * kappa; // control Point2 offset horizontal
	var oy = (h / 2) * kappa; // control Point2 offset vertical
	var xe = x + w;           // x-end
	var ye = y + h;           // y-end
	var xm = x + w / 2;       // x-middle
	var ym = y + h / 2;       // y-middle

	ctx.beginPath();
	ctx.moveTo(x, ym);
	ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	ctx.closePath();
}

