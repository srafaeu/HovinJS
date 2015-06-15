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
 * @return {Size} Return size of the image
 */
Texture.prototype.frameSize = function() { return this._frameSize; };

/**
 * Get the number of columns in the sprite
 * @return {number} Return number of columns in the sprite
 */
Sprite.prototype.cols = function() { return this._cols; };

/**
 * Get the number of rows in the sprite
 * @return {number} Return number of rows in the sprite
 */
Sprite.prototype.rows = function() { return this._rows; };

/**
 * Get the number of frames in the sprite
 * @return {number} Return number of frames in the sprite
 */
Sprite.prototype.frames = function() { return this._cols * this._rows; };


/* Initialize */

/**
 * Initialize sprite after loaded
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
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context
 * @param {number|number[]} frame Array with row and cols in the spritesheet or index frame of sprite
 * @param {Point2|Vector2} position Position of image as Point2 or Vector2
 * @param {boolean|Point2} pivot Boolean true to draw based on the center or false if is based on the top left or a Point2 object to define pivot point
 * @param {number} angle Angle for rotating image in Radians
 */
Sprite.prototype.draw = function(context, frame, position, pivot, angle) {
	var sx, sy,
		p0	= new Point2(),
		xf	= position.x(),
		yf	= position.y(),
		w	= this._size.width(),
		h	= this._size.height(),
		fw	= this._frameSize.width(),
		fh	= this._frameSize.height();
	
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
	
	if (pivot === true)
		p0 = new Point2(-(fw / 2), -(fh / 2));
	else if (pivot instanceof Point2)
		p0 = new Point2(pivot.x(), pivot.y());
	
	context.drawImage(this._file, sx, sy, fw, fh, p0.x(), p0.y(), fw, fh);
	
	context.restore();
}


/* Default operations */

/**
 * Clone the sprite to a new object
 * @return {Sprite} Return a new object reference
 */
Sprite.prototype.clone = function() {
	return new Sprite(this._id, this._path, this._frameSize, this._callback);
}


/* Serialization */

/**
 * Serialize a object into a string
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
 * @return {string} Return a string JSON of the object
 */
Sprite.prototype.toString	= Sprite.prototype.serialize;


