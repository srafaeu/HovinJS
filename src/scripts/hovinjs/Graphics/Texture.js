/**
 * @classdesc Texture image loaded dynamically
 * @class Texture
 * @param {string} id String id to identify texture
 * @param {string} source File path
 * @param {function} callback Callback function for loaded image return
 */
var Texture = function(id, source, callback) {
	var txr = this;
	
	this._id		= id;
	this._path		= source;
	this._file		= new Image();
	this._size		= new Size(0, 0);
	this._isLoaded	= false;
	this._callback	= callback;
	
	addEvent(this._file, 'abort', function(e) { callback(e, 'abort', txr); });
	addEvent(this._file, 'error', function(e) { callback(e, 'error', txr); });
	addEvent(this._file, 'load',  function(e) { callback(e, 'load' , txr); });
	
	this._file.src = this._path;
};


/* Getters and setters */

/**
 * Get Image DOM object reference
 * @return {HTMLImageElement} Return a reference to the Image DOM object
 */
Texture.prototype.file = function() { return this._file; };

/**
 * Get the size of image
 * @return {Size} Return size of the image
 */
Texture.prototype.size = function() { return this._size; };

/**
 * Get value width
 * @return {number} Return width value
 */
Texture.prototype.width = function() {
	return this._size.width();
};

/**
 * Get value height
 * @return {number} Return height value
 */
Texture.prototype.height = function(height) {
	return this._size.height();
};

/**
 * Get or set boolean indicate if image is loaded or not
 * @param {boolean|undefined} loaded (set) Set the load image status (get) undefined to get the status
 * @return {Texture|boolean} (set) Return a Texture object reference or (get) return if image is loaded or not
 */
Texture.prototype.isLoaded = function(loaded) {
	if (loaded === undefined) return this._isLoaded;
	this._isLoaded = loaded;
	return this;
};


/* Initialize */

/**
 * Initialize texture after loaded
 */
Texture.prototype.initialize = function() {
	this._size = new Size(this._file.width, this._file.height);
	this._isLoaded = true;
}

/* Draw */

/**
 * Draw the image in a specified position
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {Point2|Vector2} position Position of image as Point2 or Vector2
 * @param {boolean|Point2} pivot Boolean true to draw based on the center or false if is based on the top left or a Point2 object to define pivot point
 * @param {number} angle Angle for rotating image in Radians
 */
Texture.prototype.draw = function(context, position, pivot, angle) {
	var p0	= new Point2(),
		xf	= position.x(),
		yf	= position.y(),
		w	= this._size.width(),
		h	= this._size.height(),
		hw	= w / 2,
		hh	= h / 2;
	
	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	if (pivot === true)
		p0 = new Point2(-hw, -hh);
	else if (pivot instanceof Point2)
		p0 = new Point2(pivot.x(), pivot.y());
	
	context.drawImage(this._file, p0.x(), p0.y(), w, h);
	context.restore();
}


/* Default operations */

/**
 * Clone the texture to a new object
 * @return {Texture} Return a new object reference
 */
Texture.prototype.clone = function() {
	return new Texture(this._id, this._path, this._callback);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Texture.prototype.serialize = function() {
	return '{ "id":"' + this._id + '", "path":"' + this._path + '", "size": ' + this._size + ', "isLoaded":' + this._isLoaded + ', "file":' + this._file + ' }';
}

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Texture.prototype.toJson	= Texture.prototype.serialize;

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Texture.prototype.toString	= Texture.prototype.serialize;