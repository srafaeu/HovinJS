var Text = function(position, text, align, font, style1, style2) {
	this._position	= position || new Point2(0, 0);
	this._text		= text || "";
	this._font		= font || 0;
	this._alignment	= Text.ALIGN_LEFT;
	
	if (Text.ALIGNMENTS.toString().indexOf(align) > 0)
		this._alignment = align;

	if (style1 === undefined) {
		throw "Cannot draw a Text without both fill and stroke property";
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

Text.ALIGN_LEFT		= "left";
Text.ALIGN_CENTER	= "center";
Text.ALIGN_RIGHT	= "right";
Text.ALIGN_JUSTIFY	= "justify";
Text.ALIGNMENTS	= [ Text.ALIGN_LEFT, Text.ALIGN_CENTER, Text.ALIGN_RIGHT, Text.ALIGN_JUSTIFY ];

/* Getters and setters */

Text.prototype.position = function(position) {
	if (position === undefined) return this._position;
	this._position = position;
	return this;
};

Text.prototype.text = function(text) {
	if (text === undefined) return this._text;
	this._text = text;
	return this;
};

Text.prototype.align = function(alignment) {
	if (alignment === undefined) return this._alignment;
	this._alignment = alignment;
	return this;
};

Text.prototype.font = function(font) {
	if (font === undefined) return this._font;
	this._font = font;
	return this;
};

Text.prototype.fill = function(fill) {
	if (fill === undefined) return this._fill;
	this._fill = fill;
	return this;
};

Text.prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	this._stroke = stroke;
	return this;
};


/* Drawable */

Text.prototype.draw = function(context) {
	context.font = this._font.html();
	content.textAlign = this._alignment;
	
	if (this._fill) {
		context.fillStyle = this._fill.html(context, this._position);
		context.fillText(this._text, this._position.x(), this._position.y());
	}
	if (this._stroke) {
		context.lineWidth	= this._stroke.width();
		context.strokeStyle	= this._stroke.style().html(context);
		context.strokeText(this._text, this._position.x(), this._position.y());
	}
}
