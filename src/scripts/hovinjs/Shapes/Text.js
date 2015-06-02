/*
	Description
	::public
	+	get e set Text
	+	get e set Align
	+	get e set Fill
	+	get e set Stroke
	+	draw
	+	clone
	+	serialize / toJSON / toString

	::static
	+	AlignType
	+	ALIGNMENTS
*/

/**
 * @classdesc Text drawable shape
 * @class Text
 * @param {string} text Text for drawing
 * @param {AlignType} align Type of text alignment
 * @param {Fill|Stroke} style1 Style for Stroke or Fill of the text
 * @param {Fill|Stroke|undefined} style2 Style for Stroke or Fill of the text
 */
var Text = function(text, align, style1, style2) {
	this._text		= (text != undefined) ? text + '' : '';
	this._alignment = (Text.ALIGNMENTS.toString().indexOf(align) > 0) ? align : Text.ALIGN_LEFT;

	if (style1 === undefined && style2 === undefined) {
		throw "Cannot draw a text without both fill and stroke property";
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

/**
 * Get or set the string of text
 * @method text
 * @param {string|undefined} text (set) String for the text or (get) undefined to get the text
 * @return {Text|string} (set) Return a object reference or (get) return the text
 */
Text.prototype.text = function(text) {
	if (text === undefined) return this._text;
	this._text = text;
	return this;
};

/**
 * Get or set the align for text
 * @method align
 * @param {AlignType|undefined} align (set) Alignment type for text or (get) undefined to get the alignment type
 * @return {Text|AlignType} (set) Return a object reference or (get) return the alignment type
 */
Text.prototype.align = function(alignment) {
	if (alignment === undefined) return this._alignment;
	this._alignment = alignment;
	return this;
};

/**
 * Get or set the fill style of text
 * @method fill
 * @param {Fill|undefined} size (set) Fill style of the text or (get) undefined to get the fill style
 * @return {Text|Fill} (set) Return a object reference or (get) return the fill style
 */
Text.prototype.fill = function(fill) {
	if (fill === undefined) return this._fill;
	if (fill instanceof Fill)
		this._fill = fill;
	return this;
};

/**
 * Get or set the stroke style of text
 * @method stroke
 * @param {Stroke|undefined} stroke (set) Stroke style of the text or (get) undefined to get the stroke style
 * @return {Text|Stroke} (set) Return a object reference or (get) return the stroke style
 */
Text.prototype.stroke = function(stroke) {
	if (stroke === undefined) return this._stroke;
	if (stroke instanceof Stroke)
		this._stroke = stroke;
	return this;
};


/* Drawable */

/**
 * Draw the text
 * @method draw
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {Font} font Font object to define font used in the text
 * @param {Vector2|Point2} position A point or vector object to define the position of the object
 * @param {boolean} centered True if the draw is based on the center or false if is based on the top left
 * @param {number|undefined} angle Rotation angle in radians on drawing text
 */
Text.prototype.draw = function(context, font, position, centered, angle) {
	var x0, y0,
		xf = position.x(),
		yf = position.y();
	
	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	context.font = font.html();
	content.textAlign = this._alignment;
	
	if (centered) {
		x0 = -(w / 2);
		y0 = -(h / 2);
	} else {
		x0 = 0;
		y0 = 0;
	}
	
	if (this._fill) {
		context.fillStyle = this._fill.html(context, position);
		context.fillText(this._text, x0, y0);
	}
	if (this._stroke) {
		context.lineWidth	= this._stroke.width();
		context.strokeStyle	= this._stroke.style().html(context);
		context.strokeText(this._text, x0, y0);
	}
	
	context.restore();
}


/* Default operations */

/**
 * Clone the text to a new object
 * @method clone
 * @return {Text} Return a new object reference
 */
Text.prototype.clone = function() {
	return new Text(this._text, this._align, this._fill, this._stroke);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Text.prototype.serialize = function() {
	return '{ "text": "' + this._text + '", "align":' + this._align + ', "fill":' + this._fill + ', "stroke":' + this._stroke + ' }';
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Text.prototype.toJson	= Text.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Text.prototype.toString	= Text.prototype.serialize;



/* Static and enumeration */

/**
 * Enum for Repeatition value types.
 * @readonly
 * @enum {string}
 */
Text.AlignType	= { ALIGN_LEFT: "left", ALIGN_CENTER: "center", ALIGN_RIGHT: "right", ALIGN_JUSTIFY: "justify" };

/**
 * Array with all RepeatType
 * @static
 */
Text.ALIGNMENTS	= [ Text.AlignType.ALIGN_LEFT, Text.AlignType.ALIGN_CENTER, Text.AlignType.ALIGN_RIGHT, Text.AlignType.ALIGN_JUSTIFY ];

