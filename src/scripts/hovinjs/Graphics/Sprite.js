/*
	Description
	::public
	-	get file
	-	get width
	-	get height
	-	get isLoaded
	-	get e set size
	+	get e set frameSize
	+	get cols
	+	get rows
	+	get frames
	+	draw
	+	clone
	+	serialize / toJSON / toString

	::static
*/
/**
 * @classdesc Sprite image loaded dynamically
 * @class Sprite
 * @param {string} id String id to identify sprite
 * @param {string} source File path
 * @param {Size} frameSize Size of each frame in the Sprite image
 * @param {function} callback Callback function for loaded image return
 */
var Sprite = function(id, source, frameSize, callback) {
	this._frameSize	= (frameSize instanceof Size) ? frameSize : new Size(1, 1);
	this._cols		= 0;
	this._rows		= 0;
	
	Texture.call(this, id, source, callback);
};

inheritPrototype(Sprite, Texture);


/* Getters and setters */

/**
 * Get the size of image
 * @method frameSize
 * @return {Size} Return size of the image
 */
Texture.prototype.frameSize = function() { return this._frameSize; };

/**
 * Get the number of columns in the sprite
 * @method cols
 * @return {number} Return number of columns in the sprite
 */
Sprite.prototype.cols = function() { return this._cols; };

/**
 * Get the number of rows in the sprite
 * @method rows
 * @return {number} Return number of rows in the sprite
 */
Sprite.prototype.rows = function() { return this._rows; };

/**
 * Get the number of frames in the sprite
 * @method frames
 * @return {number} Return number of frames in the sprite
 */
Sprite.prototype.frames = function() { return this._cols * this._rows; };


/* Initialize */

/**
 * Initialize sprite after loaded
 * @method initialize
 */
Sprite.prototype.initialize = function() {
	this._size = new Size(this._file.width, this._file.height);
	this._isLoaded = true;
	
	if (this._frameSize !== undefined) {
		this._cols = Math.round(this._size.width() / this._frameSize.width());
		this._rows = Math.round(this._size.height() / this._frameSize.height());
	}
}


/* Draw */

/**
 * Draw the image in a specified position
 * @method draw
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context
 * @param {boolean} centered True if the draw is based on the center or false if is based on the top left
 * @param {number|number[]} frame Array with row and cols in the spritesheet or index frame of sprite
 * @param {Point2|Vector2} position Position of image as Point2 or Vector2
 * @param {number} angle Angle for rotating image in Radians
 */
Sprite.prototype.draw = function(context, centered, frame, position, angle) {
	var x0, y0, sx, sy,
		xf = position.x(),
		yf = position.y(),
		w = this._size.width(),
		h = this._size.height(),
		fw = this._frameSize.width(),
		fh = this._frameSize.height();
	
	if (frame instanceof Array) {
		sx = frame[1] * fw;
		sy = frame[0] * fh;
	} else if (typeof(frame) == 'number') {
		sx = Math.floor(frame % this._cols) * fw;
		sy = Math.floor(frame / this._cols) * fh;
	}
	
	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	if (centered) {
		x0 = -(fw / 2);
		y0 = -(fh / 2);
	} else {
		x0 = 0;
		y0 = 0;
	}
	
	context.drawImage(this._file, sx, sy, fw, fh, x0, y0, fw, fh);
	
	context.restore();
}


/* Default operations */

/**
 * Clone the sprite to a new object
 * @method clone
 * @return {Sprite} Return a new object reference
 */
Sprite.prototype.clone = function() {
	return new Sprite(this._id, this._path, this._frameSize, this._callback);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Sprite.prototype.serialize = function() {
	return '{ "id":"' + this._id + '", "path":"' + this._path + '", "frameSize": ' + this._frameSize + '", "size": ' + this._size + ', "isLoaded":' + this._isLoaded + ', "file":' + this._file + ' }';
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Sprite.prototype.toJson	= Sprite.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Sprite.prototype.toString	= Sprite.prototype.serialize;


