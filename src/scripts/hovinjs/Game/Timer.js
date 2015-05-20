/* class Timer */
var Timer = function() {
	this._started		= false;
	this._paused		= false;
	this._startTicks	= 0;
	this._pausedTicks	= 0;
	this._lastTicks		= 0;
};

Timer.prototype.started	= function() { return this._started; };
Timer.prototype.paused	= function() { return this._paused; };

Timer.prototype.start = function() {
	this._started = true;
	this._paused  = false;

	this._startTicks = new Date().getTime();
}

Timer.prototype.stop = function() {
    this._started	= false;
    this._paused	= false;
	
	this._startTicks	= 0;
	this._pausedTicks	= 0;
	this._lastTicks	= 0;
}

Timer.prototype.pause = function() {
	if (this._started && !this._paused) {
		this._paused = true;
		this._pausedTicks = new Date().getTime() - this._startTicks;
	}
}

Timer.prototype.unpause = function() {
	if (this._paused) {
		this._paused = false;
		this._startTicks = new Date().getTime() - this._pausedTicks;
		this._pausedTicks = 0;
	}
}

Timer.prototype.update = function() { this._lastTicks = new Date().getTime(); }

Timer.prototype.ticks = function() { return (this._paused) ? this._pausedTicks : (new Date().getTime() - this._lastTicks); }

Timer.prototype.totalElapsedTime	= function() { return new Date().getTime() - this._startTicks; }

Timer.prototype.currentElapsedTime	= function() { return this.ticks(); }


/* Timer */

Timer.prototype.toJson = 
Timer.prototype.toString = 
Timer.prototype.serialize = function() {
	return "{ started: " + this._started + 
			", paused: " + this._paused + 
			", startTicks: " + this._startTicks + 
			", pausedTicks: " + this._pausedTicks + 
			", lastTicks: " + this._lastTicks + " }";
}




