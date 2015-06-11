/*
	Description
	::public
	+	get Canvas
	+	get Context
	+	get Console
	+	get Width
	+	get Height
	+	drawVector
	+	drawBox
	+	debug
	+	resize
	+	clear
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Render objects on canvas
 * @class Viewport
 * @param {CanvasElement} Canvas element reference
 * @param {number} width A number of width value
 * @param {number} height A number of height value
 */
var Viewport = function(canvas, width, height) {
	this._canvas	= canvas
	this._context	= this._canvas.getContext('2d');
	this._console	= new ConsoleHJS();
	
	if (width != undefined && height != undefined)
		this.resize(width, height);
};


/* Getters and setters */

/**
 * Get canvas reference
 * @method canvas
 * @return {CanvasElement} Return the canvas reference
 */
Viewport.prototype.canvas = function() { return this._canvas; };

/**
 * Get context referente
 * @method canvas
 * @return {CanvasViewportingContext2D} Return reference object to the Canvas Context 
 */
Viewport.prototype.context = function() { return this._context; };

/**
 * Get console referente
 * @method console
 * @return {ConsoleHJS} Return reference object to the Console used to game debug
 */
Viewport.prototype.console = function() { return this._console; };

/**
 * Get value width
 * @method width
 * @return {number} Return width of canvas
 */
Viewport.prototype.width = function() { return this._canvas.width; };

/**
 * Get value height
 * @method height
 * @return {number} Return height of canvas
 */
Viewport.prototype.height = function() { return this._canvas.height; };


/* Methods */

/**
 * Draw an arrow to demonstrate a Vector2 property using a position and color
 * @method drawVector
 * @param {Vector2} vector Vector reference to be drawed on the screen as arrow
 * @param {Point2|Vector2} position Position as Point2 or Vector2 for vector arrow start
 * @param {Color} color Color class for identify the arrow
 */
Viewport.prototype.drawVector = function(vector, position, color) {
	var arrow = new Arrow(vector.size(), new Stroke(1, color));
	
	arrow.draw(this._context, position, false, vector.angle());
}

/**
 * Draw an box to demonstrate a BoundingBox property using a position and color
 * @method drawBox
 * @param {BoundingBox} box BoundingBox reference to be drawed on the screen as rectangle
 * @param {Point2|Vector2} position Position as Point2 or Vector2 for rectangle start
 * @param {Color} color Color class for identify the rectangle
 */
Viewport.prototype.drawBox = function(box, position, color) {
	var arrow = new Arrow(box.size(), new Stroke(1, color));
	
	arrow.draw(this._context, position, true, 0);
}

/**
 * Print a string on the console and add a new line in the end of string
 * @method debug
 * @param {string} text String text to be printed on the console
 */
Viewport.prototype.debug = function(text) {
	this._console.debugln(text);
}


/* Properties */
/**
 * Resize the canvas
 * @param {number} width Width of the canvas
 * @param {number} height Height of the canvas
 * @return {Viewport} Return a object reference
 */
Viewport.prototype.resize = function(width, height) {
	this._canvas.width	= width || window.innerWidth - 2;
	this._canvas.height	= height || window.innerHeight - 2;
	return this;
}

/**
 * Clear the canvas window and debug console
 * @return {Viewport} Return a object reference
 */
Viewport.prototype.clear = function() {
	this._context.clearRect(0, 0, this.width(), this.height());
	this._console.clear();
	return this;
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Viewport.prototype.serialize = function() { return "{ width: " + this._width + ", height: " + this._height + " }"; }

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Viewport.prototype.toJson = Viewport.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Viewport.prototype.toString = Viewport.prototype.serialize;

