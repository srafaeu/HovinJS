/*
	Description
	::public
	+	get currentTarget
	+	get x
	+	get y
	+	get globalX
	+	get globalY
	+	get button
	+	get buttons
	+	hasActiveKeys
	+	addActiveKey
	+	clear
	+	enable
	+	disable
	+	up
	+	down
	+	press
	+	clone
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Mouse event handler
 * @class Mouse
 * @param {WindowElement} targetWindow WindowElement that dispatch the mouse events
 */
var Mouse = function(targetWindow) {
	this._activeButtons	= [Mouse.Status.NONE, Mouse.Status.NONE, Mouse.Status.NONE];
	this._position		= new Point2(0, 0);
	this._global		= new Point2(0, 0);
	this._currentTarget = undefined;
	this._target		= (targetWindow == undefined) ? targetWindow : window;
};


/* Initialize */

/**
 * Initialize mouse listener
 * @method initialize
 */
Mouse.prototype.initialize = function() {
	this.enable();
}


/* Getters and Setters */

/**
 * Get the current mouse target
 * @method currentTarget
 * @return {object} Return the current mouse target
 */
Mouse.prototype.currentTarget = function() { return this._currentTarget; };

/**
 * Get the X coordinate of mouse in the target
 * @method x
 * @return {number} Return the coordinate X of the mouse
 */
Mouse.prototype.x = function() { return this._position.x(); };

/**
 * Get the Y coordinate of mouse in the target
 * @method y
 * @return {number} Return the coordinate Y of the mouse
 */
Mouse.prototype.y = function() { return this._position.y(); };

/**
 * Get the X coordinate of mouse in global screen
 * @method globalX
 * @return {number} Return the coordinate X of the mouse
 */
Mouse.prototype.globalX = function() { return this._global.x(); };

/**
 * Get the Y coordinate of mouse in global screen
 * @method globalY
 * @return {number} Return the coordinate Y of the mouse
 */
Mouse.prototype.globalY = function() { return this._global.y(); };

/**
 * Get the actived mouse button
 * @method button
 * @param {Mouse.Button} index Index of mouse button
 * @return {string} Return the button status
 */
Mouse.prototype.button = function(index) { return this._activeButtons[index]; };

/**
 * Get the array of active buttons
 * @method buttons
 * @return {string[]} Return the array of active buttons
 */
Mouse.prototype.buttons = function() { return this._activeButtons; };

/**
 * Get if any button is actived
 * @method hasActiveButtons
 * @return {boolean} Return true if mouse has any actived button or false if its not
 */
Mouse.prototype.hasActiveButtons = function() {	return this._activeButtons.length > 0; };


/* Manipulating buttons */

/**
 * Add an active mouse button
 * @method addActiveButton
 * @param {Mouse.Button} index Index of mouse button
 * @param {Mouse.Status} status Mouse button status type
 */
Mouse.prototype.addActiveButton = function(index, status) {
	this._activeButtons[index] = status;
}

/**
 * Clear all actived keys
 * @method clear
 */
Mouse.prototype.clear = function() {
	this._activeButtons = [Mouse.Status.NONE, Mouse.Status.NONE, Mouse.Status.NONE];
	this._currentTarget = undefined;
}

/**
 * Clear all actived keys
 * @method update
 */
Mouse.prototype.update = Mouse.prototype.clear;

/* Enable mouse */

/**
 * Enable event listeners for mouse move, click down and up and double click
 * @method enable
 */
Mouse.prototype.enable = function() {
	var kbd = this;
	
	addEvent(this._target, 'mousemove', function(e) { kbd.__mousemove(e) });
	addEvent(this._target, 'mouseup', function(e) { kbd.__mouseup(e) });
	addEvent(this._target, 'mousedown', function(e) { kbd.__mousedown(e) });
	addEvent(this._target, 'dblclick', function(e) { kbd.__mousedblclick(e) });
}

/**
 * Disable event listeners for mouse move, click down and up and double click
 * @method disable
 */
Mouse.prototype.disable = function() {
	removeEvent(this._target, 'mousemove');
	removeEvent(this._target, 'mouseup');
	removeEvent(this._target, 'mousedown');
	removeEvent(this._target, 'dblclick');
}


/* Mouse events */

/**
 * Hidden method to handle mouse down event
 * @method __mousedown
 * @param {MouseEvent} Event dispatch by the listener
 */
Mouse.prototype.__mousedown = function(event) {
	this.addActiveButton(event.button, Mouse.STATUS_DOWN);
	this._currentTarget = event.target;
}

/**
 * Hidden method to handle mouse up event
 * @method __mouseup
 * @param {MouseEvent} Event dispatch by the listener
 */
Mouse.prototype.__mouseup = function(event) {
	this.addActiveButton(event.button, Mouse.STATUS_UP);
	this._currentTarget = event.target;
}

/**
 * Hidden method to handle mouse double click event
 * @method __mousedblclick
 * @param {MouseEvent} Event dispatch by the listener
 */
Mouse.prototype.__mousedblclick = function(event) {
	this.addActiveButton(event.button, Mouse.STATUS_DBLCLICK);
	this._currentTarget = event.target;
}

/**
 * Hidden method to handle mouse move event
 * @method __mousemove
 * @param {MouseEvent} Event dispatch by the listener
 */
Mouse.prototype.__mousemove = function(event) {
	this._position.x(event.clientX);
	this._position.y(event.clientY);
	this._global.x(event.screenX);
	this._global.y(event.screenY);
	this._currentTarget = event.target;
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Mouse.prototype.serialize = function() {
	return "{ buttons: " + this._activeButtons + ", target: " + this._target  + ", position: " + this._position  + ", global: " + this._global + " }";
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Mouse.prototype.toJson = Mouse.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Mouse.prototype.toString = Mouse.prototype.serialize;



/* Enumeration */

/**
 * Enum for button types
 * @readonly
 * @enum {number}
 */
Mouse.Button = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };

/**
 * Enum for mouse status
 * @readonly
 * @enum {string}
 */
Mouse.Status =  {
	NONE: "none",
	CLICK: "click",
	CONTEXTMENU: "contextmenu",
	DBLCLICK: "dblclick",
	DOWN: "down",
	ENTER: "enter",
	LEAVE: "leave",
	MOVE: "move",
	OVER: "over",
	OUT: "out",
	UP: "up"
};


