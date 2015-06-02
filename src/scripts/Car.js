function Car(position, color) {
	this._body		= new Polygon(new Size(10, 20), 3, new Fill(color));
	this._position	= position;
	this._velocity	= new Vector2.fromSizeAndAngle(1, 0);
	this._angle		= 0;
	
	this._mass		= 100.0;
	this._maxForce	= 35.0;
	this._maxSpeed	= 50.0;

	
}

inheritPrototype(Car, IVehicle);
 // http://gamedevelopment.tutsplus.com/tutorials/understanding-steering-behaviors-seek--gamedev-849
 
Car.prototype.update = function(timer, target) {
	var accelSecs,
		forces	= new Vector2(),
		gravity	= Vector2.fromSizeAndAngle(9.8, Angle.toRadians(90)),
		time	= timer.totalElapsedTime() / 1000;
		//time	= timer.currentElapsedTime() / 1000;
	
	forces.add(SteeringBehavior.seek(this, target.position()));
	//forces.add(gravity);
	forces.truncate(this._maxSpeed);
	
	accelSecs = Vector2.multiply(Vector2.divide(forces, this._mass), time);
	
	console.log(forces);
	
	this._velocity.add(accelSecs);
	this._angle = this._velocity.angle();
	this._position.add(this._velocity);
}

Car.prototype.draw = function(context) {
	this._body.draw(context, this._position, this._velocity.angle());
}

Car.prototype.position		= function(){ return this._position; };
Car.prototype.velocity 		= function(){ return this._velocity; };
Car.prototype.direction		= function(){ return Vector2.fromSizeAndAngle(1, this._angle); };
Car.prototype.mass			= function(){ return this._mass; };
Car.prototype.maxSpeed		= function(){ return this._maxSpeed; };
Car.prototype.maxForce		= function(){ return this._maxForce; };