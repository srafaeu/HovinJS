function Car(position, angle, color) {
	this._mass		= 100.0;
	this._maxForce	= 4.0;
	this._maxSpeed	= 4.0;

	this._body		= new Polygon(new Size(50, 25), 3, new Fill(color));
	this._position	= position;
	this._angle		= angle || 0;
	this._velocity	= new Vector2.fromSizeAndAngle(3, this._angle);
}

inheritPrototype(Car, IVehicle);
 
Car.prototype.update = function(timer, target) {
	var acceleration,
		forces	= new Vector2(),
		time	= timer.totalElapsedTime() / 1000;
	
	
	//forces.add(SteeringBehavior.seek(this, target.position())); // OK
	//forces.add(SteeringBehavior.flee(this, target.position(), 200)); // ERROR
	//forces.add(SteeringBehavior.arrive(this, target.position(), 200)); // OK
	//forces.add(SteeringBehavior.pursuit(this, target)); // UNTESTED
	//forces.add(SteeringBehavior.wander(this, timer)); // UNTESTED
	//forces.truncate(this._maxSpeed);
	
	acceleration = Vector2.multiply(Vector2.divide(forces, this._mass), time);
	
	render.debug(time);
	render.debug(this._velocity);
	
	this._velocity.add(acceleration);
	this._angle = this._velocity.angle();
	this._position.add(this._velocity);
}

Car.prototype.draw = function(context) {
	this._body.draw(context, this._position, true, this._angle);
	
	//render.drawVector(this._velocity, this._position, new Color("#990099"));
}

Car.prototype.position		= function(){ return this._position; };
Car.prototype.velocity 		= function(){ return this._velocity; };
Car.prototype.direction		= function(){ return Vector2.fromSizeAndAngle(1, this._angle); };
Car.prototype.mass			= function(){ return this._mass; };
Car.prototype.maxSpeed		= function(){ return this._maxSpeed; };
Car.prototype.maxForce		= function(){ return this._maxForce; };