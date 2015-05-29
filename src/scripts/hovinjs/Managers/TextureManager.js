/* class TextureManager */
var TextureManager = function(loaded) {
	var mng = this;
	
	this._total		= 0;
	this._textures	= [];
	this._manager	= new Object();
	this._loaded	= loaded || function() {};
};


/* Loader */

TextureManager.prototype.__loader = function(event, manager, type, texture) {
	if (type == 'load') {
		texture.width(texture.image().width);
		texture.height(texture.image().height);
		texture.isLoaded(true);
		
		this._total++;
		
		if (this.isFinished())
			this._loaded();
	} else {
		throw "Cannot load image!";
	}
}


/* Inserts */

TextureManager.prototype.addTexture = function(id, source) {
	var tmg = this;
	var texture = new Texture(id, source, function(e, type, texture) { tmg.__loader(e, tmg, type, texture); });
	
	this._manager[id] = this._textures.length;
	this._textures.push(texture);
	
	return texture;
}

TextureManager.prototype.addTextures = function(textures) {
	var i = 0;
	var texture;
	
	for (i = 0; i < textures.length; i++) {
		texture = textures[i];
		
		if (texture instanceof Array && texture[0] !== undefined && texture[1] !== undefined)
			this.addTexture(texture[0], texture[1]);
		else if (typeof(texture) == 'object' && texture.id !== undefined && texture.source !== undefined)
			this.addTexture(texture.id, texture.source);
	}
}

TextureManager.prototype.texture = function(id) {
	if (this._manager[id] !== undefined)
		return this._textures[this._manager[id]];
	else
		return undefined;
};

TextureManager.prototype.clear = function() {
	this._textures	= [];
	this._manager	= new Object();
}


/* Getters and setters */

TextureManager.prototype.size = function() { return this._textures.length; };

TextureManager.prototype.totalLoaded = function() { return this._total; };

TextureManager.prototype.isFinished = function() { return (this._total == this._textures.length); };


/* Serialization */

TextureManager.prototype.toJson = 
TextureManager.prototype.toString = 
TextureManager.prototype.serialize = function() {
	return '{"total":' + this._total + ',"manager":' + this._manager + ',"textures":' + this._textures + " }";
}

