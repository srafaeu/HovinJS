/* class SpriteAnimation */

//int velocity, bool loop, IEnumerable<int> frames
var SpriteAnimation = function(msPerFrame, frames, loop) {
	this._timePerFrame	= msPerFrame || 1000;
	this._frames		= frames || [ 0 ];
	this._looping		= loop || false;
	
	this._time		= 0;
	this._current	= 0;
};


/* Getters and setters */

SpriteAnimation.prototype.millisecondsPerFrame = 
SpriteAnimation.prototype.msPerFrame = function() { return this._timePerFrame; };

SpriteAnimation.prototype.frames = function() { return this._frames; };

SpriteAnimation.prototype.isLooping = function() { return this._looping; };

SpriteAnimation.prototype.currentFrame = function() { return this._frames[this._current]; };


/* Update */

SpriteAnimation.prototype.update = function(timeLapsed) {
	this._time += timeLapsed;
	if (this._time > this._timePerFrame) {
		this._time = 0;
		if (this._current > this._frames.length) {
			if (this._looping)
				this._current = 0;
		} else {
			this._current++;
		}
	}
}


/* Serialization */

SpriteAnimation.prototype.toJson = 
SpriteAnimation.prototype.toString = 
SpriteAnimation.prototype.serialize = function() {
	return '{"timePerFrame":' + this._timePerFrame + ',"frames":' + this._frames + ',"looping":' + this._looping + ',"current":' + this._current + '}';
}