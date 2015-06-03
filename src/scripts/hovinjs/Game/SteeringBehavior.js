/* class SteeringBehavior */
var SteeringBehavior = function() {};

SteeringBehavior.wanderJitter	= 4.0;

SteeringBehavior.wanderRadius	= 50.0;

SteeringBehavior.wanderDistance	= 100.0;

// IVehicle vehicle, Vector2 target
SteeringBehavior.seek = function(vehicle, target) {
	var vector = target.clone();

	vector.subtract(vehicle.position());
	vector.normalize();
	vector.multiply(vehicle.maxSpeed());
	vector.subtract(vehicle.velocity());

	return vector;
}

// IVehicle vehicle, Vector2 target, double panicDistance
SteeringBehavior.flee = function(vehicle, target, panicDistance) {
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
SteeringBehavior.arrive = function(vehicle, target, deceleration) {
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
SteeringBehavior.pursuit = function(pursuer, evader) {
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
SteeringBehavior.wander = function(vehicle) {
	var circleCenter, displacement, targetLocal,
		random = new Random();

	circleCenter = vehicle.velocity().clone();
	circleCenter.normalize();
	circleCenter.multiply(SteeringBehavior.wanderDistance);
	
	displacement = Vector2.fromSizeAndAngle(SteeringBehavior.wanderRadius, Angle.toRadians(random.nextRangeInt(-90, 90)));
	
	//out.debugln(Angle.toRadians(random.nextRangeInt(0, 360)), true);
	
	targetLocal = Vector2.add(circleCenter, displacement);
	
	
	cir = new Circle(displacement.size(), new Stroke(1, new Color("#00AA00")));
	dis = new Arrow(displacement.size(), new Stroke(1, new Color("#AA0000")));
	wan = new Arrow(circleCenter.size(), new Stroke(1, new Color("#0000AA")));
	tar = new Arrow(targetLocal.size(), new Stroke(1, new Color("#00AAAA")));
	
	cir.draw(context, Vector2.add(vehicle.position(), circleCenter), true, 0);
	dis.draw(context, Vector2.add(vehicle.position(), circleCenter), false, displacement.angle());
	wan.draw(context, vehicle.position(), false, circleCenter.angle());
	tar.draw(context, vehicle.position(), false, targetLocal.angle());
	
	
	
	return targetLocal;
}


/** @interface IVehicle */
var IVehicle = function() {}

IVehicle.position	= function(){}; // Vector2
IVehicle.velocity 	= function(){}; // Vector2
IVehicle.direction	= function(){}; // Vector2
IVehicle.mass		= function(){}; // double 
IVehicle.maxSpeed	= function(){}; // double 
IVehicle.maxForce	= function(){}; // double 


