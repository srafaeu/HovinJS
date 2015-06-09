/*
	Description
	::public
	+	get Started
	+	get Paused
	+	get Ticks
	+	get TotalElapsedTime
	+	get CurrentElapsedTime
	+	start
	+	stop
	+	pause
	+	unpause
	+	update
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Text drawable shape
 * @class Text
 * @param {string} text Text for drawing
 * @param {AlignType} align Type of text alignment
 * @param {Fill|Stroke} style1 Style for Stroke or Fill of the text
 * @param {Fill|Stroke|undefined} style2 Style for Stroke or Fill of the text
 */
var Timer = function() {
	this._started		= false;
	this._paused		= false;
	this._startTicks	= 0;
	this._pausedTicks	= 0;
	this._lastTicks		= 0;
};


/* Getters and setters */

/**
 * Get if timer is started or not
 * @method started
 * @return {boolean} Return true if timer is started or false if it's not
 */
Timer.prototype.started	= function() { return this._started; };

/**
 * Get if timer is paused or not
 * @method paused
 * @return {boolean} Return true if timer is paused or false if it's not
 */
Timer.prototype.paused	= function() { return this._paused; };

/**
 * Get the time between last update and the current time or paused time
 * @method ticks
 * @return {number} Miliseconds of current time or last paused time
 */
Timer.prototype.ticks = function() { return (this._paused) ? this._pausedTicks : (new Date().getTime() - this._lastTicks); }

/**
 * Get the time between started time and the current time
 * @method totalElapsedTime
 * @return {number} Miliseconds of total elapsed time since start
 */
Timer.prototype.totalElapsedTime = function() { return new Date().getTime() - this._startTicks; }

/**
 * Get the time between last update and the current time or paused time
 * @method currentElapsedTime
 * @return {number} Miliseconds of current time or last paused time
 */
Timer.prototype.currentElapsedTime	= function() { return this.ticks(); }


/* Controller */

/**
 * Start the timer counting
 * @metho start
 */
Timer.prototype.start = function() {
	this._started = true;
	this._paused  = false;

	this._startTicks = new Date().getTime();
}

/**
 * Stop the timer counting and zero fill the timer values
 * @metho stop
 */
Timer.prototype.stop = function() {
    this._started	= false;
    this._paused	= false;
	
	this._startTicks	= 0;
	this._pausedTicks	= 0;
	this._lastTicks	= 0;
}

/**
 * Pause the timer counting
 * @metho pause
 */
Timer.prototype.pause = function() {
	if (this._started && !this._paused) {
		this._paused = true;
		this._pausedTicks = new Date().getTime() - this._startTicks;
	}
}

/**
 * Unpause the timer counting
 * @metho unpause
 */
Timer.prototype.unpause = function() {
	if (this._paused) {
		this._paused = false;
		this._startTicks = new Date().getTime() - this._pausedTicks;
		this._pausedTicks = 0;
	}
}

/**
 * Update the timer last tick with the new current time
 * @metho update
 */
Timer.prototype.update = function() { this._lastTicks = new Date().getTime(); }


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Timer.prototype.serialize = function() {
	return "{ started: " + this._started + 
			", paused: " + this._paused + 
			", startTicks: " + this._startTicks + 
			", pausedTicks: " + this._pausedTicks + 
			", lastTicks: " + this._lastTicks + " }";
}

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Timer.prototype.toJson = Timer.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Timer.prototype.toString = Timer.prototype.serialize;



