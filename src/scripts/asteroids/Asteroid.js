var Asteroid = function(initialPosition) {
	this._mass		= 100.0;
	this._maxForce	= 4.0;
	this._maxSpeed	= 4.0;
	this._rotation	= Angle.toRadians(1);
	
	this._lifes		= 3;
	this._body		= undefined;
	this._position	= initialPosition;
	this._velocity	= new Vector(0, 1);
	this._angle		= 0;
	this._state		= Asteroid.State.OFF;
	
}


Asteroid.prototype.initialize = function(textureManager) {
	this._body = textureManager.addSprite("asteroid", "/images/Viper.png", new Size(100, 65));
	
}


Asteroid.prototype.update = function(timer, up, down, left, right) {
	var time = timer.totalElapsedTime() / 1000;
	
	if (left) this._velocity.rotate(-this._rotation);
	if (right) this._velocity.rotate(this._rotation);
	
	this._velocity.add(acceleration);
	this._angle = this._velocity.angle();
	this._position.add(this._velocity);
}

Asteroid.prototype.draw = function() {
	
}


Asteroid.State = { OFF: 0, ON: 1, FLYING: 2 };