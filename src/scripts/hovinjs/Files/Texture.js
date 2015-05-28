/*
	Description
	::public
	+	get file
	+	get width
	+	get height
	+	get isLoaded
	+	get e set size
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
	
	addEvent(this._file, 'abort', function(e) { callback(e, 'abort', txr); });
	addEvent(this._file, 'error', function(e) { callback(e, 'error', txr); });
	addEvent(this._file, 'load',  function(e) { callback(e, 'load' , txr); });
	
	this._file.src = this._path;
};


/* Getters and setters */

Texture.prototype.file = function() { return this._file; };

Texture.prototype.size = function(size) {
	if (size === undefined) return this._size;
	if (size instanceof Size)
		this._size = size;
	return this;
};

Texture.prototype.width = function() {
	return this._size.width();
};

Texture.prototype.height = function(height) {
	return this._height;
};

Texture.prototype.isLoaded = function(loaded) {
	if (loaded === undefined) return this._isLoaded;
	this._isLoaded = loaded;
	return this;
};


/* Html */

Texture.prototype.html = function(context, position) {
	return context.drawImage(this._image, position.x(), position.y());
}


/* Serialization */

Texture.prototype.toJson = 
Texture.prototype.toString = 
Texture.prototype.serialize = function() {
	return '{ "id":"' + this._id + '", "width": ' + this._width + ', "height":' + this._height + ', "path":"' + this._path + '", "image":' + this._image + ', "isLoaded":' + this._isLoaded + ' }';
}

