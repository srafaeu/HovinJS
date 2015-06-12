/**
 * @classdesc Simple game loop
 * @class GameHovin
 * @param {string} id of canvas element
 * @param {GameScreen} screen Game screen implementation to run the main loop
 */
var GameHovin = function(id, screen) {
	var glp = this;
	
	this._id		= id;
	this._state		= GameHovin.State.CREATED;
	
	this._render	= undefined;
	this._keyboard	= undefined;
	this._mouse		= undefined;
	this._timer		= undefined;
	this._textures	= undefined;
	
	this._screen	= screen;
};

/**
 * Initialize the loop game and create all attributes
 * @param {number} width A number of width value
 * @param {number} height A number of height value
 */
GameHovin.prototype.initialize = function(width, height) {
	var glp = this;
	
	this._render	= new Viewport(document.querySelector('canvas#' + this._id), width, height);
	this._keyboard	= new Keyboard(window);
	this._mouse		= new Mouse(window);
	this._textures	= new TextureManager(function(){ glp.start(); });
	this._timer		= new Timer();
	
	this._keyboard.initialize();
	this._mouse.initialize();
	
	this._state = GameHovin.State.STARTING;
	
	this.load();
	this.run();
}


/* Main Loop */

/**
 * Run the game loop
 */
GameHovin.prototype.run = function() {
	this.clear();
	this.execute();
	this.read();
	this.queue();
}


/* Methods */

/**
 * Start load textures and enter in waiting mode
 */
GameHovin.prototype.load = function() {
	this._state = GameHovin.State.WAITING;
	
	this._screen.load(this._textures); // HANDLER
}

/**
 * 
 */
GameHovin.prototype.start = function() {
	this._state = GameHovin.State.EXECUTING;
	this._timer.start();
	
	this._screen.start(this._state); // HANDLER
}

/**
 * Initialize the loop game and create all attributes
 */
GameHovin.prototype.execute = function() {
	if (this._state == GameHovin.State.WAITING && this._textures.isFinished()) {
		this._state = GameHovin.State.EXECUTING;
	}
	
	this._screen.update(this._state, this._timer, this._keyboard, this._mouse);  // HANDLER
	this._screen.draw(this._state, this._timer, this._render, this._keyboard, this._mouse);  // HANDLER
}

GameHovin.prototype.pause = function() {
	this._state = GameHovin.State.PAUSED;
	this._timer.pause();
}

GameHovin.prototype.unpause = function() {
	this._state = GameHovin.State.EXECUTING;
	this._timer.unpause();
}

GameHovin.prototype.exit = function() {
	this._state = GameHovin.State.EXITING;
	this._screen.exit(this._state, this._timer, this._render);  // HANDLER
}


/* Fixed methods */

GameHovin.prototype.clear = function() {
	this._render.clear();
}

GameHovin.prototype.read = function() {
	this._timer.update();
	this._keyboard.update();
	this._mouse.update();
}

GameHovin.prototype.queue = function() {
	var hvn = this;
	window.requestAnimationFrame(function() { hvn.run(); });
}


/* Getters and setters */

GameHovin.prototype.render = function() { return this._render; };

GameHovin.prototype.state = function() { return this._state; };


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
GameHovin.prototype.serialize = function() { return "{ id: " + this._id + ", state: " + this._state + " }"; }

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
GameHovin.prototype.toJson = GameHovin.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
GameHovin.prototype.toString = GameHovin.prototype.serialize;


/* Enumeration */

/**
 * Enum for GameHovin state
 * @readonly
 * @enum {number}
 */
GameHovin.State = { CREATED: 0, STARTING: 1, WAITING: 2, EXECUTING: 3, PAUSED: 4, EXITING: 5 };

