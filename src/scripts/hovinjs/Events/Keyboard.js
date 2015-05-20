/* class Keyboard */
var Keyboard = function(targetWindow) {
	this._activeKeys = [];
	this._mappedKeys = new Object();
	this._target	 = targetWindow || window;
};


/* Initialize */

Keyboard.prototype.initialize = function() {
	this.enable();
}


/* Getters and Setters */

Keyboard.prototype.hasActiveKeys = function() {	return this._activeKeys.length > 0; };

Keyboard.prototype.addActiveKey = function(key, code, charcode, status) {
	this._mappedKeys[key.toLowerCase()] = this._activeKeys.length;
	this._activeKeys.push(new Key(code, key, charcode, status));
}

Keyboard.prototype.key = function(key) {
	if (this._mappedKeys[key.toLowerCase()] !== undefined)
		return this._activeKeys[this._mappedKeys[key.toLowerCase()]];
	else
		return undefined;
};

Keyboard.prototype.keys = function() { return this._activeKeys; };

Keyboard.prototype.clear = function() {
	this._activeKeys = [];
	this._mappedKeys = new Object();
}


/* Enable keyboard */

Keyboard.prototype.enable = function() {
	var kbd = this;
	
	addEvent(this._target, 'keyup', function(e) { kbd.keyup(e) });
	addEvent(this._target, 'keydown', function(e) { kbd.keydown(e) });
	addEvent(this._target, 'keypress', function(e) { kbd.keypress(e) });
}

Keyboard.prototype.disable = function() {
	removeEvent(this._target, 'keyup');
	removeEvent(this._target, 'keydown');
	removeEvent(this._target, 'keypress');
}


/* Keyboard events */

Keyboard.prototype.keyup = function(event) { this.addActiveKey(event.key, event.keyCode, event.charCode, Key.STATUS_UP); }

Keyboard.prototype.keydown = function(event) { this.addActiveKey(event.key, event.keyCode, event.charCode, Key.STATUS_DOWN); }

Keyboard.prototype.keypress = function(event) { this.addActiveKey(event.key, event.keyCode, event.charCode, Key.STATUS_PRESS); }


/* Serialization */

Keyboard.prototype.toJson = 
Keyboard.prototype.toString = 
Keyboard.prototype.serialize = function() { return "{ keys: " + this._activeKeys + " }"; }


/* class Key */
var Key = function(id, name, charcode, status) {
	this._id		= id;
	this._name		= name;
	this._charcode	= charcode;
	this._status	= status;
}


/* Types */

Key.STATUS_DOWN		= "down";
Key.STATUS_UP		= "up";
Key.STATUS_PRESS	= "press";


/* Serialization */

Key.prototype.toJson = 
Key.prototype.toString = 
Key.prototype.serialize = function() {
	return "{ id: " + this._id + ", name: " + this._name + ", charcode: " + this._charcode + ", status: " + this._status + " }";
}


