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
 * @classdesc Manager for texture and sprite loaded dynamically
 * @class TextureManager
 * @param {function} loaded Callback function for all images are loaded
 */
var TextureManager = function(loaded) {
	var mng = this;
	
	this._total		= 0;
	this._textures	= [];
	this._manager	= new Object();
	this._loaded	= (loaded == undefined) ? function() {} : loaded;
};


/* Loader */

/**
 * Hidden method for each image callback after load
 * @method __loader
 * @param {Event} event Event reference of image loading process completed
 * @param {TextureManager} manager TextureManager reference used in the image loader
 * @param {string} type Type of event dispatch ('error', 'abort', 'load')
 * @param {Texture|Sprite} texture Reference to the image object (texture, sprite)
 */
TextureManager.prototype.__loader = function(event, manager, type, texture) {
	if (type == 'load') {
		texture.initialize();
		this._total++;
		
		if (this.isFinished())
			this._loaded();
	} else {
		throw "Cannot load image!";
	}
}


/* Inserts */

/**
 * Add texture into the mananger
 * @method addTexture
 * @param {string} id String id to identify texture
 * @param {string} source File path
 * @param {Size} frameSize Size of each frame in the texture image
 * @return {Texture} Return a reference to the new Texture added
 */
TextureManager.prototype.addTexture = function(id, source) {
	var mng = this;
	var texture = new Texture(id, source, function(e, type, texture) { mng.__loader(e, mng, type, texture); });
	
	this._manager[id] = this._textures.length;
	this._textures.push(texture);
	
	return texture;
}

/**
 * Add group of textures into the mananger
 * @method addTextures
 * @param {object[]|array[]} textures Array of objects or array with the 2 elements (id, source) for each texture
 */
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

/**
 * Add sprite into the mananger
 * @method addSprite
 * @param {string} id String id to identify sprite
 * @param {string} source File path
 * @param {Size} frameSize Size of each frame in the Sprite image
 * @return {Sprite} Return a reference to the new Sprite added
 */
TextureManager.prototype.addSprite = function(id, source, frameSize) {
	var tmg = this;
	var sprite = new Sprite(id, source, frameSize, function(e, type, texture) { tmg.__loader(e, tmg, type, texture); });
	
	this._manager[id] = this._textures.length;
	this._textures.push(sprite);
	
	return sprite;
}

/**
 * Add group of sprites into the mananger
 * @method addTextures
 * @param {object[]|array[]} sprites Array of objects or array with the 2 elements (id, source, frameSize) for each sprite
 */
TextureManager.prototype.addSprites = function(sprites) {
	var i = 0;
	var sprite;
	
	for (i = 0; i < sprites.length; i++) {
		sprite = sprites[i];
		
		if (sprite instanceof Array && sprite[0] !== undefined && sprite[1] !== undefined && sprite[2] !== undefined)
			this.addSprite(sprite[0], sprite[1], sprite[2]);
		else if (typeof(sprite) == 'object' && sprite.id !== undefined && sprite.source !== undefined && sprite.frameSize !== undefined)
			this.addSprite(sprite.id, sprite.source, sprite.frameSize);
	}
}

/**
 * Get the texture referenced by id
 * @method texture
 * @param {string} id Id for the texture
 * @return {Texture} Return a reference to the texture referenced by id
 */
TextureManager.prototype.texture = function(id) {
	if (this._manager[id] !== undefined)
		return this._textures[this._manager[id]];
	else
		return undefined;
};

/**
 * Get the sprite referenced by id
 * @method sprite
 * @param {string} id Id for the sprite
 * @return {Sprite} Return a reference to the sprite referenced by id
 */
TextureManager.prototype.sprite = TextureManager.prototype.texture;

/**
 * Clear the textures and sprites on the manager
 * @method clear
 */
TextureManager.prototype.clear = function() {
	this._textures	= [];
	this._manager	= new Object();
}


/* Getters and setters */

/**
 * Get the number of textures and sprites in the manager
 * @method size
 * @return {number} Return number of textures and sprites in the manager
 */
TextureManager.prototype.size = function() { return this._textures.length; };

/**
 * Get the number of total texture loaded
 * @method totalLoaded
 * @return {number} Return number of total texture loaded
 */
TextureManager.prototype.totalLoaded = function() { return this._total; };

/**
 * Get if all textures and sprites are loaded
 * @method isFinished
 * @return {number} Return true if all textures and sprites are loaded and false if it's not
 */
TextureManager.prototype.isFinished = function() { return (this._total == this._textures.length); };


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
TextureManager.prototype.serialize = function() {
	return '{"total":' + this._total + ',"manager":' + this._manager + ',"textures":' + this._textures + " }";
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
TextureManager.prototype.toJson = TextureManager.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
TextureManager.prototype.toString = TextureManager.prototype.serialize;

