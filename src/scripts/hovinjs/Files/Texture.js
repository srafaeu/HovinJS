/* class Texture */
var Texture = function(id, source, loaded) {
	var txr = this;
	
	this._id		= id;
	this._size		= new Size(0, 0);
	this._path		= source;
	this._image		= new Image();
	this._isLoaded	= false;
	
	addEvent(this._image, 'abort', function(e) { loaded(e, 'abort', txr); });
	addEvent(this._image, 'error', function(e) { loaded(e, 'error', txr); });
	addEvent(this._image, 'load',  function(e) { loaded(e, 'load' , txr); });
	
	this._image.src = this._path;
};


/* Getters and setters */

Texture.prototype.image = function() { return this._image; };

Texture.prototype.size = function(size) {
	if (size === undefined) return this._size;
	if (size instanceof Size)
		this._size = size;
	return this;
};

Texture.prototype.width = function(width) {
	if (width === undefined) return this._size.width();
	this._size.width(width);
	return this;
};

Texture.prototype.height = function(height) {
	if (height === undefined) return this._height;
	this._height = height;
	return this;
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

