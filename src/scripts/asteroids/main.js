var gm, game;

$(document).ready(function(){
	gm = new GameMain();
	game = new GameHovin("gameview", gm);
	
	game.initialize(window.innerWidth - 4, window.innerHeight - 50);
});


/**
 * @classdesc Interface of a Game Screen executed during Game Loop
 * @class GameMain
 */
var GameMain = function() {};

inheritPrototype(GameMain, GameScreen)


/**
 * Load method for creating textures and sprites
 * @method load
 * @param {TextureManager} Reference to the texture manager object
 */
GameMain.prototype.load = function(textures) {
	
	
};

/**
 * Start method executed after loading all textures
 * @method start
 */
GameMain.prototype.start = function() {
	
	
};

/**
 * Update method executed inside the game loop
 * @method update
 * @param {GameHovin.State} state Current state of game loop
 * @param {Timer} timer Timer of loop with current and total time elapsed
 * @param {Keyboard} keyboard Manager of keyboard events
 * @param {Mouse} mouse Manager of mouse events
 */
GameMain.prototype.update = function(state, timer, keyboard, mouse) {
	
	switch (state) {
		case GameHovin.State.EXECUTING:
			if (keyboard.tryKey(Key.KeyNames.KEY_SPACE, Key.Status.UP) !== undefined) {
				game.pause();
			}
			if (keyboard.tryKey(Key.KeyNames.KEY_BACKSPACE, Key.Status.UP) !== undefined) {
				game.exit();
			}
			break;
		case GameHovin.State.WAITING:
			
			break;
		case GameHovin.State.PAUSED:
			if (keyboard.tryKey(Key.KeyNames.KEY_SPACE, Key.Status.UP) !== undefined) {
				game.unpause();
			}
			break;
		case GameHovin.State.EXITING:
			break;
	}
};

/**
 * Draw method executed inside the game loop
 * @method draw
 * @param {GameHovin.State} state Current state of game loop
 * @param {Timer} timer Timer of loop with current and total time elapsed
 * @param {Viewport} render Render object reference of viewport
 */
GameMain.prototype.draw = function(state, timer, render, keyboard, mouse) {
	render.debug(keyboard.key(Key.KeyNames.KEY_SPACE));
	render.debug(state);
};

/**
 * Exit method executed to finalize the game loop
 * @method exit
 * @param {GameHovin.State} state Current state of game loop
 * @param {Timer} timer Timer of loop with current and total time elapsed
 * @param {Viewport} render Render object reference of viewport
 */
GameMain.prototype.exit = function(state, timer, render) { 

};
