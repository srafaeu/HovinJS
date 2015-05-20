/* class Render */
var Render = function(canvas, width, height) {
	this._canvas = canvas
	this._context = this._canvas.getContext('2d');
	
	this.resize(width, height);
};


/* Getters and setters */

Render.prototype.canvas = function() { return this._canvas; };

Render.prototype.context = function() { return this._context; };

Render.prototype.height = function() { return this._canvas.height; };

Render.prototype.width = function() { return this._canvas.width; };


/* Properties */

Render.prototype.resize = function(width, height) {
	this._canvas.width	= width || 1280;
	this._canvas.height	= height || 720;
	return this;
}

Render.prototype.clear = function() {
	this._context.clearRect(0, 0, this.width(), this.height());
	return this;
}


/* Serialization */

Render.prototype.toJson = 
Render.prototype.toString = 
Render.prototype.serialize = function() { return "{ width: " + this._width + ", height: " + this._height + " }"; }


