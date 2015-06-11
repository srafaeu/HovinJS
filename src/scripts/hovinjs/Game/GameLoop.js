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
 * @classdesc Simple game loop
 * @class GameLoop
 * @param {string} id of canvas element
 * @param {function} load Method executed in the load game loop
 * @param {function} start Method executed in the start game loop
 * @param {function} wait Method executed in the wait game loop
 * @param {function} pause Method executed in the pause game loop
 * @param {function} update Method executed in the update game loop
 * @param {function} draw Method executed in the draw game loop
 * @param {function} exit Method executed in the exit game loop
 */
var GameLoop = function(id, load, start, wait, pause, update, draw, exit) {
	var glp = this;
	
	this._id		= id;
	this._state		= GameLoop.State.CREATED;
	
	this._render	= undefined;
	this._keyboard	= undefined;
	this._mouse		= undefined;
	this._timer		= undefined;
	this._textures	= undefined;
	
	this._load		= load || function() {};
	this._start		= start || function() {};
	this._wait		= wait || function() {};
	this._pause		= pause || function() {};
	this._update	= update || function() {};
	this._draw		= draw || function() {};
	this._exit		= exit || function() {};
};

/**
 * Initialize the loop game and create all attributes
 * @method initialize
 * @param {number} width A number of width value
 * @param {number} height A number of height value
 */
GameLoop.prototype.initialize = function(width, height) {
	var glp = this;
	
	this._render	= new Viewport(document.querySelector('canvas#' + this._id), width, height);
	this._keyboard	= new Keyboard(window);
	this._mouse		= new Mouse(window);
	this._textures	= new TextureManager(function(){ glp.start(); });
	this._timer		= new Timer();
	
	this._keyboard.initialize();
	this._mouse.initialize();
	
	this._state = GameLoop.State.STARTED;
	
	this.load();
}

GameLoop.prototype.load = function() {
	this._load(this._textures); // HANDLER
	
	this._state = GameLoop.State.WAITING;
	this.loop();
}

GameLoop.prototype.loop = function() {
	this.clear();
	
	if (this._state == GameLoop.State.EXECUTING) {
		this.update();
		this.draw();
	} else {
		this.wait();
	}
	this.read();
	this.queue();
}
 
GameLoop.prototype.start = function() {
	this._timer.start();
	this._state = GameLoop.State.EXECUTING;
	
	this._start(); // HANDLER
}

GameLoop.prototype.wait = function() {
	this._wait(this._textures);  // HANDLER
}

GameLoop.prototype.update = function() {
	this._update(this._timer, this._keyboard, this._mouse);  // HANDLER
}
 
GameLoop.prototype.draw = function() {
	this._draw(this._timer, this._render);  // HANDLER
}

GameLoop.prototype.pause = function() {
	this._timer.pause();
	this._state = GameLoop.State.PAUSED;
	this._pause(this._timer, this._render);  // HANDLER
}

GameLoop.prototype.unpause = function() {
	this._timer.unpause();
	this._state = GameLoop.State.EXECUTING;
}

GameLoop.prototype.exit = function() {
	this._state = GameLoop.State.EXITING;
	this._exit(this._timer, this._render);  // HANDLER
}




/* Fixed methods */

GameLoop.prototype.clear = function() {
	this._render.clear();
}

GameLoop.prototype.read = function() {
	this._timer.update();
	this._keyboard.update();
	this._mouse.update();
}

GameLoop.prototype.queue = function() {
	var hvn = this;
	window.requestAnimationFrame(function() { hvn.loop(); });
}


/* Getters and setters */

GameLoop.prototype.render = function() { return this._render; };

GameLoop.prototype.state = function() { return this._state; };


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
GameLoop.prototype.serialize = function() { return "{ id: " + this._id + ", state: " + this._state + " }"; }

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
GameLoop.prototype.toJson = GameLoop.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
GameLoop.prototype.toString = GameLoop.prototype.serialize;


/* Enumeration */

/**
 * Enum for gameloop state
 * @readonly
 * @enum {string}
 */
GameLoop.State = { CREATED: 0, STARTED: 1, WAITING: 2, EXECUTING: 3, PAUSED: 4, EXITING: 5 };

