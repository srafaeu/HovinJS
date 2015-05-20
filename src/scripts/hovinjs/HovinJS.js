/* class HovinJS */
var HovinJS = function(id, width, height, loader, starter, updater, drawer) {
	var hvn = this;
	
	this._id		= id;
	this._render	= undefined;
	this._keyboard	= undefined;
	this._mouse		= undefined;
	this._timer		= undefined;
	this._textures	= undefined;
	
	this._loader	= loader || function() {};
	this._starter	= starter || function() {};
	this._updater	= updater || function() {};
	this._drawer	= drawer || function() {};
	
	this.initialize(width, height);
};


HovinJS.prototype.initialize = function(width, height) {
	var hvn = this;
	
	this._render	= new Render(document.querySelector('canvas#' + this._id), width, height);
	this._keyboard	= new Keyboard();
	this._mouse		= new Mouse();
	this._timer		= new Timer();
	this._textures	= new TextureManager(function(){ hvn.start(); });
	
	this._keyboard.initialize();
	this._mouse.initialize();
	
	this.load();
	this.loop();
}

HovinJS.prototype.load = function() {
	this._loader(this._textures);
}

HovinJS.prototype.start = function() {
	this._timer.start();
	this._starter();
}

HovinJS.prototype.loop = function() {
	if (this._textures.isFinished()) {
		this.clear();
		this.update();
		this.draw();
		this.read();
	}
	this.queue();
}
 
HovinJS.prototype.clear = function() {
	if (!this._timer.started())
		this._timer.start();
	
	this._render.clear();
}
 
HovinJS.prototype.update = function() {
	this._updater(this._timer, this._keyboard, this._mouse);
}
 
HovinJS.prototype.draw = function() {
	this._drawer(this._render);
}
 
HovinJS.prototype.read = function() {
	this._timer.update();
	this._keyboard.clear();
	this._mouse.clear();
}
 
HovinJS.prototype.queue = function() {
	var hvn = this;
	window.requestAnimationFrame(function() { hvn.loop(); });
}
	
	
/* Getters and setters */

HovinJS.prototype.render = function() {
	return this._render;
};


/* Serialization */

HovinJS.prototype.toJson = 
HovinJS.prototype.toString = 
HovinJS.prototype.serialize = function() { return "{ id: " + this._id + ", render: " + this._render + " }"; }
