/* class Mouse */
var Mouse = function(targetWindow) {
	this._activeButtons	= [Mouse.STATUS_NONE, Mouse.STATUS_NONE, Mouse.STATUS_NONE];
	this._target		= targetWindow || window;
	this._position		= new Point2(0, 0);
	this._global		= new Point2(0, 0);
	this._currentTarget = undefined;
};


/* Types */

Mouse.BUTTON_LEFT	= 0;
Mouse.BUTTON_MIDDLE	= 1;
Mouse.BUTTON_RIGHT	= 2;

Mouse.STATUS_NONE			= "none";
Mouse.STATUS_CLICK			= "click";
Mouse.STATUS_CONTEXTMENU	= "contextmenu";
Mouse.STATUS_DBLCLICK		= "dblclick";
Mouse.STATUS_DOWN			= "down";
Mouse.STATUS_ENTER			= "enter";
Mouse.STATUS_LEAVE			= "leave";
Mouse.STATUS_MOVE			= "move";
Mouse.STATUS_OVER			= "over";
Mouse.STATUS_OUT			= "out";
Mouse.STATUS_UP				= "up";


/* Initialize */

Mouse.prototype.initialize = function() {
	this.enable();
}


/* Getters and Setters */

Mouse.prototype.hasActiveButtons = function() {	return this._activeButtons.length > 0; };

Mouse.prototype.addActiveButton = function(index, status) {
	this._activeButtons[index] = status;
}

Mouse.prototype.currentTarget = function() { return this._currentTarget; };

Mouse.prototype.x = function() { return this._position.x(); };

Mouse.prototype.y = function() { return this._position.y(); };

Mouse.prototype.globalX = function() { return this._global.x(); };

Mouse.prototype.globalY = function() { return this._global.y(); };

Mouse.prototype.button = function(index) { return this._activeButtons[index]; };

Mouse.prototype.buttons = function() { return this._activeButtons; };

Mouse.prototype.clear = function() {
	this._activeButtons = [Mouse.STATUS_NONE, Mouse.STATUS_NONE, Mouse.STATUS_NONE];
	this._currentTarget = undefined;
}


/* Enable mouse */

Mouse.prototype.enable = function() {
	var kbd = this;
	
	addEvent(this._target, 'mousemove', function(e) { kbd.mousemove(e) });
	addEvent(this._target, 'mouseup', function(e) { kbd.mouseup(e) });
	addEvent(this._target, 'mousedown', function(e) { kbd.mousedown(e) });
	addEvent(this._target, 'dblclick', function(e) { kbd.mousedblclick(e) });
}

Mouse.prototype.disable = function() {
	removeEvent(this._target, 'mousemove');
	removeEvent(this._target, 'mouseup');
	removeEvent(this._target, 'mousedown');
	removeEvent(this._target, 'dblclick');
}


/* Mouse events */

Mouse.prototype.mousedown = function(event) {
	this.addActiveButton(event.button, Mouse.STATUS_DOWN);
	this._currentTarget = event.target;
}

Mouse.prototype.mouseup = function(event) {
	this.addActiveButton(event.button, Mouse.STATUS_UP);
	this._currentTarget = event.target;
}

Mouse.prototype.mousedblclick = function(event) {
	this.addActiveButton(event.button, Mouse.STATUS_DBLCLICK);
	this._currentTarget = event.target;
}

Mouse.prototype.mousemove = function(event) {
	this._position.x(event.clientX);
	this._position.y(event.clientY);
	this._global.x(event.screenX);
	this._global.y(event.screenY);
	this._currentTarget = event.target;
}


/* Serialization */

Mouse.prototype.toJson = 
Mouse.prototype.toString = 
Mouse.prototype.serialize = function() {
	return "{ buttons: " + this._activeButtons + ", target: " + this._target  + ", position: " + this._position  + ", global: " + this._global + " }";
}