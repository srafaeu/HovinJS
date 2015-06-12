/*
	Description
	::interface
	+	load
	+	start
	+	update
	+	draw
	+	exit
*/
/**
 * @classdesc Interface of a Game Screen executed during Game Loop
 * @interface GameScreen
 */
var GameScreen = function() {};

/**
 * Load method for creating textures and sprites
 * @method load
 * @param {TextureManager} textureManager Reference to the texture manager object
 */
GameScreen.prototype.load = function(textureManager) { throw "Error: interface method not implemented."; };

/**
 * Start method executed after loading all textures
 * @method start
 */
GameScreen.prototype.start = function() { throw "Error: interface method not implemented."; };

/**
 * Update method executed inside the game loop
 * @method update
 * @param {GameLoop.State} state Current state of game loop
 * @param {Timer} timer Timer of loop with current and total time elapsed
 * @param {Keyboard} keyboard Manager of keyboard events
 * @param {Mouse} mouse Manager of mouse events
 */
GameScreen.prototype.update = function(state, timer, keyboard, mouse) { throw "Error: interface method not implemented."; };

/**
 * Draw method executed inside the game loop
 * @method draw
 * @param {GameLoop.State} state Current state of game loop
 * @param {Timer} timer Timer of loop with current and total time elapsed
 * @param {Viewport} render Render object reference of viewport
 */
GameScreen.prototype.draw = function(state, timer, render) { throw "Error: interface method not implemented."; };

/**
 * Exit method executed to finalize the game loop
 * @method exit
 * @param {GameLoop.State} state Current state of game loop
 * @param {Timer} timer Timer of loop with current and total time elapsed
 * @param {Viewport} render Render object reference of viewport
 */
GameScreen.prototype.exit = function(state, timer, render) { throw "Error: interface method not implemented."; };

