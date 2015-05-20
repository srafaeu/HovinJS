/* class Sprite */
var Sprite = function(texture, size) {
	var txr = this;
	
	this._size		= size;
	this._rows		= -1;
	this._cols		= -1;
	this._texture	= texture;
	
	this._animations = [];
};

Sprite.prototype.initialize = function() {
	if (this._texture.isLoaded()) {
		this._cols = Math.round(this._texture.width() / this._size.width());
		this._rows = Math.round(this._texture.height() / this._size.height());
	}
}


/* Getters and setters */

Sprite.prototype.cols = function() { return this._cols; };

Sprite.prototype.rows = function() { return this._rows; };

Sprite.prototype.total = function() { return this._cols * this._rows; };

Sprite.prototype.image = function() { return this._texture; };

Sprite.prototype.isLoaded = function() { return this._texture.isLoaded(); }


/* Animation */

Sprite.prototype.addAnimation = function(animation) {
	if (animation instanceof SpriteAnimation)
		this._animations.push(animation);
	return this;
};

Sprite.prototype.insertAnimation = function (index, animation) {
	this._animations.splice(index, 0, animation);
	return this;
};

Sprite.prototype.removeAnimation = function (index) {
	return this._animations.splice(index, 1);
};

Sprite.prototype.updateAnimation = function(index, timeLapsed) {
	return this._animations[index].update(timeLapsed);
}


/* Html */
// context, row, column, position
// context, animationIndex, position
Sprite.prototype.html = function() {
	var context	= arguments[0];
	var sx, sy;
	var width 	= this._size.width();
	var height	= this._size.height();
		
	if (arguments.length == 3) {
		var index		= arguments[1];
		var position	= arguments[2];
		var frame 		= this._animations[index].currentFrame();
		
		sx = (frame % this._cols) * width;
		sy = (frame / this._cols) * height;
	} else if (arguments.length == 4) {
		var row			= arguments[1];
		var column		= arguments[2];
		var position	= arguments[3];
		
		sx = column * this._size.width();
		sy = row * this._size.height();
	}
	
	return context.drawImage(this._texture.image(), sx, sy, width, height, position.x(), position.y(), width, height);
}


/* Serialization */

Sprite.prototype.toJson = 
Sprite.prototype.toString = 
Sprite.prototype.serialize = function() {
	return '{"size":' + this._size + ',"rows":' + this._rows + ',"cols":' + this._cols + ',"texture":' + this._texture + '}';
}

