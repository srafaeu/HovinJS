/**
 * @classdesc Keyboard event handler
 * @class Keyboard
 * @param {WindowElement} targetWindow WindowElement that dispatch the keyboard events
 */
var Keyboard = function(targetWindow) {
	this._activeKeys = [];
	this._mappedKeys = new Object();
	this._target	 = (targetWindow == undefined) ? targetWindow : window;
};


/* Initialize */

/**
 * Initialize keyboard listener
 */
Keyboard.prototype.initialize = function() {
	this.enable();
}


/* Getters and Setters */

/**
 * Get the actived key
 * @param {string} key Name of key
 * @return {Key} Return the key reference
 */
Keyboard.prototype.key = function(key) {
	if (this._mappedKeys[key.toLowerCase()] !== undefined)
		return this._activeKeys[this._mappedKeys[key.toLowerCase()]];
	else
		return undefined;
};

/**
 * Try if a key is actived and in a specified state
 * @param {string} key Name of key
 * @param {press} state State of key
 * @return {Key} Return the key reference
 */
Keyboard.prototype.tryKey = function(key, state) {
	var k;
	if (this._mappedKeys[key.toLowerCase()] !== undefined) {
		k = this._activeKeys[this._mappedKeys[key.toLowerCase()]];
		return (k.status() == state) ? k : undefined;
	}
	
	return undefined;
};

/**
 * Get the array of Active keys
 * @return {Key[]} Return the array of active keys
 */
Keyboard.prototype.keys = function() { return this._activeKeys; };

/**
 * Get if any key is actived
 * @return {boolean} Return true if keyboard has any actived key or false if its not
 */
Keyboard.prototype.hasActiveKeys = function() {	return this._activeKeys.length > 0; };


/* Manipulating Keys */

/**
 * Add an active key
 * @param {number} code Key code identifier
 * @param {string} name Name of key
 * @param {string} charcode Equivalent char value
 * @param {Key.Status} status Status of key between PRESS, DOWN and UP
 */
Keyboard.prototype.addActiveKey = function(code, name, charcode, status) {
	this._mappedKeys[name.toLowerCase()] = this._activeKeys.length;
	this._activeKeys.push(new Key(code, name, charcode, status));
}

/**
 * Clear all actived keys
 */
Keyboard.prototype.clear = function() {
	this._activeKeys = [];
	this._mappedKeys = new Object();
}

/**
 * Clear all actived keys
 */
Keyboard.prototype.update = Keyboard.prototype.clear;

/* Enable keyboard */

/**
 * Enable event listeners for key up, down and press
 */
Keyboard.prototype.enable = function() {
	var kbd = this;
	
	addEvent(this._target, 'keydown', function(e) { kbd.__keydown(e) });
	addEvent(this._target, 'keyup', function(e) { kbd.__keyup(e) });
	addEvent(this._target, 'keypress', function(e) { kbd.__keypress(e) });
}

/**
 * Disable event listeners for key up, down and press
 */
Keyboard.prototype.disable = function() {
	removeEvent(this._target, 'keydown');
	removeEvent(this._target, 'keyup');
	removeEvent(this._target, 'keypress');
}


/* Keyboard events */

/**
 * Hidden method to handle keyup event
 * @private
 * @param {KeyboardEvent} Event dispatch by the listener
 */
Keyboard.prototype.__keyup = function(event) {
	this.addActiveKey(event.keyCode, event.code, event.charCode, Key.Status.UP);
}

/**
 * Hidden method to handle keydown event
 * @private
 * @param {KeyboardEvent} Event dispatch by the listener
 */
Keyboard.prototype.__keydown = function(event) {
	this.addActiveKey(event.keyCode, event.code, event.charCode, Key.Status.DOWN);
}

/**
 * Hidden method to handle keypress event
 * @private
 * @param {KeyboardEvent} Event dispatch by the listener
 */
Keyboard.prototype.__keypress = function(event) {
	this.addActiveKey(event.keyCode, event.code, event.charCode, Key.Status.PRESS);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Keyboard.prototype.serialize = function() { return "{ keys: " + this._activeKeys + " }"; }

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Keyboard.prototype.toJson = Keyboard.prototype.serialize;

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Keyboard.prototype.toString = Keyboard.prototype.serialize;




/* ******************** Key Class ******************** */

/**
 * @classdesc Key values and status
 * @class Key
 * @param {number} code Key code identifier
 * @param {string} name Name of key
 * @param {number} charcode Equivalent char value
 * @param {Key.Status} status Status of key between PRESS, DOWN and UP
 */
var Key = function(code, name, charcode, status) {
	this._code		= code;
	this._name		= name;
	this._charcode	= charcode;
	this._status	= status;
}


/* Getters and Setters */

/**
 * Get the code of the key
 * @return {number} Return key code 
 */
Key.prototype.code = function() { return this._code; };

/**
 * Get the name of key
 * @return {string} Return the name of key
 */
Key.prototype.name = function() { return this._name; };

/**
 * Get the equivalent char value
 * @return {number} Return equivalent char value
 */
Key.prototype.charcode = function() { return this._charcode; };

/**
 * Get the status of key between PRESS, DOWN and UP
 * @return {Key.Status} Return status of key between PRESS, DOWN and UP
 */
Key.prototype.status = function() { return this._status; };


/* Default operations */

/**
 * Clone the key to a new object
 * @return {Key} Return a new object reference
 */
Key.prototype.clone = function() {
	return new Key(this._id, this._name, this._charcode, this._status);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Key.prototype.serialize = function() {
	return "{ id: " + this._id + ", name: " + this._name + ", charcode: " + this._charcode + ", status: " + this._status + " }";
}

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Key.prototype.toJson = Key.prototype.serialize;

/**
 * Serialize a object into a string
 * @return {string} Return a string JSON of the object
 */
Key.prototype.toString = Key.prototype.serialize;


/* Enumeration */

/**
 * Enum for key status.
 * @readonly
 * @enum {string}
 */
Key.Status = { DOWN: "down", UP: "up", PRESS: "press" };

/**
 * Enum for mapped key codes.
 * @readonly
 * @enum {number}
 */
Key.Keys = {
	KEY_BACKSPACE:	8,
	KEY_TAB:		9,
	KEY_ENTER:		13,
	KEY_SH_TAB:		16,
	KEY_ESC:		27,
	KEY_SPACE:		32,
	KEY_END:		35,
	KEY_HOME:		36,
	KEY_LEFT:		37,
	KEY_UP:			38,
	KEY_RIGHT:		39,
	KEY_DOWN:		40,
	KEY_DEL:		46,
	KEY_A:			65,
	KEY_B:			66,
	KEY_C:			67,
	KEY_D:			68,
	KEY_E:			69,
	KEY_F:			70,
	KEY_G:			71,
	KEY_H:			72,
	KEY_I:			73,
	KEY_J:			74,
	KEY_K:			75,
	KEY_L:			76,
	KEY_M:			77,
	KEY_N:			78,
	KEY_O:			79,
	KEY_P:			80,
	KEY_Q:			81,
	KEY_R:			82,
	KEY_S:			83,
	KEY_T:			84,
	KEY_U:			85,
	KEY_V:			86,
	KEY_W:			87,
	KEY_X:			88,
	KEY_Y:			89,
	KEY_Z:			90,
	KEY_F01:		112,
	KEY_F02:		113,
	KEY_F03:		114,
	KEY_F04:		115,
	KEY_F05:		116,
	KEY_F06:		117,
	KEY_F07:		118,
	KEY_F08:		119,
	KEY_F09:		120,
	KEY_F10:		121,
	KEY_F11:		122,
	KEY_F12:		123
};


/**
 * Enum for mapped key names.
 * @readonly
 * @enum {string}
 */
Key.KeyNames = {
	KEY_BACKSPACE:	"backspace",
	KEY_TAB:		"tab",
	KEY_ENTER:		"enter",
	KEY_SH_TAB:		"",
	KEY_ESC:		"escape",
	KEY_SPACE:		"space",
	KEY_END:		"end",
	KEY_HOME:		"home",
	KEY_LEFT:		"arrowleft",
	KEY_UP:			"arrowup",
	KEY_RIGHT:		"arrowright",
	KEY_DOWN:		"arrowdown",
	KEY_DEL:		"delete",
	KEY_A:			"a",
	KEY_B:			"b",
	KEY_C:			"c",
	KEY_D:			"d",
	KEY_E:			"e",
	KEY_F:			"f",
	KEY_G:			"g",
	KEY_H:			"h",
	KEY_I:			"i",
	KEY_J:			"j",
	KEY_K:			"k",
	KEY_L:			"l",
	KEY_M:			"m",
	KEY_N:			"n",
	KEY_O:			"o",
	KEY_P:			"p",
	KEY_Q:			"q",
	KEY_R:			"r",
	KEY_S:			"s",
	KEY_T:			"t",
	KEY_U:			"u",
	KEY_V:			"v",
	KEY_W:			"w",
	KEY_X:			"x",
	KEY_Y:			"y",
	KEY_Z:			"z",
	KEY_F01:		"F1",
	KEY_F02:		"F2",
	KEY_F03:		"F3",
	KEY_F04:		"F4",
	KEY_F05:		"F5",
	KEY_F06:		"F6",
	KEY_F07:		"F7",
	KEY_F08:		"F8",
	KEY_F09:		"F9",
	KEY_F10:		"F10",
	KEY_F11:		"F11",
	KEY_F12:		"F12"
};