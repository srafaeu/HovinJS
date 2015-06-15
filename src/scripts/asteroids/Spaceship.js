var Spaceship = function(initialPosition) {
	this.MASS		= 100.0;
	this.VELOCITY	= 4.0;
	this.ROTATION	= Angle.toRadians(1);
	
	this._lifes		= 3;
	this._body		= undefined;
	this._position	= initialPosition;
	this._velocity	= new Vector2(0, 1);
	this._angle		= 0;
	this._state		= Spaceship.State.OFF;
}


Spaceship.prototype.initialize = function(textureManager) {
	this._body = textureManager.addSprite("spaceship", "/images/Viper.png", new Size(100, 65));
	
}

/*

        public Shot SimpleShot(ContentManager gameContent)
        {
            Shot shot = new Shot(this._type, this.ShotPosition, this._angle);
            shot.LoadContent(gameContent);

            return shot;
        }	
		
		
        public bool TestCollision(Rectangle rectangleShot, int damage, Vector2D force = null) {
            Rectangle rectangleShip = this._image.Rectangle;
            if (rectangleShip.Intersects(rectangleShot))
            {
                if (force != null)
                    this._forces += force;

                this._energy -= damage;
                if (this._energy < 1)
                {
                    this._life--;
                    this._energy = 100;
                }
                return true;
            }
            return false;
        }

*/

Spaceship.prototype.update = function(timer, up, down, left, right) {
	var time = timer.totalElapsedTime() / 1000,
		forces = new Vector2(),
		acceleration = new Vector2();
	
	this._state = Spaceship.State.ON;
	
	if (left) this._velocity.rotate(-this.ROTATION);
	if (right) this._velocity.rotate(this.ROTATION);
	if (up) {
		forces.add(Vector2.fromSizeAndAngle(this.VELOCITY, this._angle));
		this._state = Spaceship.State.FLYING;
	}

	acceleration = Vector2.multiply(Vector2.divide(forces, this._mass), this._time);

	this._velocity.add(acceleration);
	this._angle = this._velocity.angle();
	this._position.add(this._velocity);
}

Spaceship.prototype.draw = function(context) {
	this._body.draw(context, this._state, this._position, true, this._angle);
}


Spaceship.State = { OFF: 0, ON: 1, FLYING: 2 };