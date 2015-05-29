/*
	Description
	::public
	+	get file
	+	get width
	+	get height
	+	get isLoaded
	+	get e set size
	+	draw
	+	clone
	+	serialize / toJSON / toString

	::static
	
*/

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
 * @method file
 * @return {HTMLImageElement} Return a reference to the Image DOM object
 */
Texture.prototype.file = function() { return this._file; };

/**
 * Get or set the size of image
 * @method size
 * @param {Size|undefined} size (set) Size object to define width and height of image or (get) undefined to get the size
 * @return {Texture|Size} (set) Return a Texture object reference or (get) return Size object
 */
Texture.prototype.size = function(size) {
	if (size === undefined) return this._size;
	if (size instanceof Size)
		this._size = size;
	return this;
};

/**
 * Get value width
 * @method width
 * @return {number} Return position width value
 */
Texture.prototype.width = function() {
	return this._size.width();
};

/**
 * Get value height
 * @method height
 * @return {number} Return position height value
 */
Texture.prototype.height = function(height) {
	return this._size.height();
};

/**
 * Get or set boolean indicate if image is loaded or not
 * @method isLoaded
 * @param {boolean|undefined} loaded (set) Set the load image status (get) undefined to get the status
 * @return {Texture|boolean} (set) Return a Texture object reference or (get) return if image is loaded or not
 */
Texture.prototype.isLoaded = function(loaded) {
	if (loaded === undefined) return this._isLoaded;
	this._isLoaded = loaded;
	return this;
};


/* Draw */

/**
 * Draw the image in a specified position
 * @method draw
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context 
 * @param {Point2|Vector2} position Position of image as Point2 or Vector2
 * @param {number} angle Angle for rotating image in Radians
 */
Texture.prototype.draw = function(context, position, angle) {
	var xf	= position.x(),
		yf	= position.y(),
		w	= this._size.width(),
		h	= this._size.height();

	context.save();
	context.translate(xf, yf);
	
	if (angle !== undefined)
		context.rotate(angle);
	
	context.drawImage(this._image, -(width / 2), -(height / 2), width, height);
}


/* Default operations */

/**
 * Clone the texture to a new object
 * @method clone
 * @return {Texture} Return a new object reference
 */
Texture.prototype.clone = function() {
	return new Texture(this._id, this._path, this._callback);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Texture.prototype.serialize = function() {
	return '{ "id":"' + this._id + '", "path":"' + this._path + '", "size": ' + this._size + ', "isLoaded":' + this._isLoaded + ', "file":' + this._file + ' }';
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Texture.prototype.toJson	= Texture.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Texture.prototype.toString	= Texture.prototype.serialize;