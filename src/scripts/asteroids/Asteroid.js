var Asteroid = function(initialPosition, type) {
	this._body		= undefined;
	this._position	= initialPosition;
	this._velocity	= new Vector2(1, 1);
	this._angle		= 0;
	this._type		= type;
}


Asteroid.prototype.initialize = function(textureManager) {
	this._body = textureManager.addSprite("asteroid", "./images/Asteroids.png", new Size(100, 100));
}

/*
Asteroid.prototype.testCollision = function(Rectangle rectangleShot, int damage) {
	  Rectangle rectangleShip = this._image.Rectangle;
            if (rectangleShip.Intersects(rectangleShot))
            {
                this._energy -= damage;

                return true;
            }
            return false;
}
*/

Asteroid.prototype.update = function(timer) {
	var time = timer.totalElapsedTime() / 1000,
		forces = Vector2.fromSizeAndAngle(Asteroid.Asteroids[this._type].velocity, 0),
		acceleration = new Vector2();
	
	acceleration = Vector2.multiply(Vector2.divide(forces, Asteroid.Asteroids[this._type].mass), this._time);

	this._velocity.rotate(Asteroid.Asteroids[this._type].rotation);
	this._velocity.add(acceleration);
	
	this._angle = this._velocity.angle();
	
	this._position.add(this._velocity);
}

Asteroid.prototype.draw = function(context) {
	this._body.draw(context, this._type, this._position, true, this._angle);
}

Asteroid.Type = { EARTH: 0, ICE: 1, ROCK: 2 };

Asteroid.Asteroids = [
	{ mass: 500.0, velocity: 1.0, rotation: Angle.toRadians(0.5), energy: 15 },
	{ mass: 750.0, velocity: 0.2, rotation: Angle.toRadians(0.1), energy: 30 },
	{ mass: 250.0, velocity: 1.0, rotation: Angle.toRadians(1.0), energy: 5 }
]