/* class SteeringBehavior */
var SteeringBehavior = function() {
	this._wanderJitter		= 4.0;
	this._wanderRadius		= 20.0;
	this._wanderDistance	= 10.0;
};

// IVehicle vehicle, Vector2 target
SteeringBehavior.prototype.seek = function(vehicle, target) {
	var vector = target.clone();

	vector.subtract(vehicle.position());
	vector.normalize();
	vector.multiply(vehicle.maxSpeed());
	vector.subtract(vehicle.velocity());

	return vector;
}

// IVehicle vehicle, Vector2 target, double panicDistance
SteeringBehavior.prototype.flee = function(vehicle, target, panicDistance) {
	var distance = vehicle.position().clone();

	distance.subtract(target);
	
	if (distance.size() > panicDistance)
		return new Vector2(0, 0);

	distance.normalize();
	distance.multiply(vehicle.maxSpeed());
	distance.subtract(vehicle.velocity());

	return distance;
}

// IVehicle vehicle, Vector2 target, float deceleration
SteeringBehavior.prototype.arrive = function(vehicle, target, deceleration) {
	var dist, speed;
	var vector = new Vector2(0, 0);
	var toTarget = target.clone();
	
	toTarget.subtract(vehicle.position());

	dist = toTarget.size();
	if (dist > 0) {
		speed = dist / deceleration;
		speed = speed < vehicle.maxSpeed() ? speed : vehicle.maxSpeed();
		vector = toTarget.clone();
		vector.multiply(speed).divide(dist).subtract(vehicle.velocity());
	}
	
	return vector;
}

// IVehicle pursuer, IVehicle evader
SteeringBehavior.prototype.pursuit = function(pursuer, evader) {
	var relativeDir, lookAheadTime, newposition;
	var toEvader = evader.position().clone();
	var fromPursuer = pursuer.direction().clone();
	
	toEvader.subtract(pursuer.position());
	
	relativeDir = fromPursuer.dot(evader.direction());

	if (toEvader.dot(pursuer.direction()) > 0 && (relativeDir < -0.95)) // acos(0.95) = 18 degs
	{
		return this.seek(pursuer, evader.position());
	}

	lookAheadTime = toEvader.Size / (pursuer.maxSpeed() + evader.velocity().size());
	newposition = evader.position().clone();
	newposition.add(evader.velocity()).multiply(lookAheadTime);
	
	return this.seek(pursuer, newposition);
}

// IVehicle vehicle
SteeringBehavior.prototype.wander = function(vehicle) {
	var wanderTarget, targetLocal;

	wanderTarget = new Vector2(SteeringBehavior.randomClamped() * this._wanderJitter, SteeringBehavior.randomClamped() * this._wanderJitter);
	wanderTarget.normalize();
	wanderTarget.multiply(this._wanderRadius);
	
	targetLocal = wanderTarget.clone();
	targetLocal.add(new Vector2(this._wanderDistance, 0)).subtract(vehicle.position());

	return targetLocal;
}

// static double
SteeringBehavior.randomClamped = function()
{
	var random = new Random();

	return ((random.nextInt(100000) % 2) == 0) ? random.nextDouble() : random.NextDouble();
}


/* SteeringBehavior */

SteeringBehavior.prototype.toJson = 
SteeringBehavior.prototype.toString = 
SteeringBehavior.prototype.serialize = function() {
	return "{ wanderJitter: " + this._wanderJitter + ", wanderRadius: " + this._wanderRadius + ", wanderDistance: " + this._wanderDistance + " }";
}


/* interface IVehicle */
var IVehicle = function() {}

IVehicle.position		= function(){};
IVehicle.velocity 		= function(){};
IVehicle.direction		= function(){};
IVehicle.mass			= function(){};
IVehicle.maxSpeed		= function(){};
IVehicle.maxForce		= function(){};
IVehicle.timeElapsed	= function(){};