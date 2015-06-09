/* class SteeringBehavior */
var SteeringBehavior = function() {};

SteeringBehavior.wanderJitter	= 10;

SteeringBehavior.wanderRadius	= 200.0;

SteeringBehavior.wanderDistance	= 200.0;

SteeringBehavior.wanderAngle = 0;

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
SteeringBehavior.wander = function(vehicle, timer) {
	var wanderForce, circleCenter, displacement;
	
	circleCenter = vehicle.velocity().clone();
	circleCenter.normalize();
	circleCenter.multiply(SteeringBehavior.wanderDistance);
	
	displacement = new Vector2();
	//displacement.angle(SteeringBehavior.wanderAngle);
	
	SteeringBehavior.wanderAngle += (random.nextRange(-1, 1) * SteeringBehavior.wanderJitter) - (SteeringBehavior.wanderJitter * 0.5);
	//displacement.rotate(Angle.toRadians(random.nextRange(-1, 1) * SteeringBehavior.wanderJitter));
	
	wanderForce = Vector2.add(circleCenter, displacement);
	
	var disp, dist, circle, forc;
	circle = new Circle(displacement.size(), new Stroke(1, new Color("#000099")));
	disp = new Arrow(displacement.size(), new Stroke(1, new Color("#990000")));
	dist = new Arrow(circleCenter.size(), new Stroke(1, new Color("#009900")))
	forc = new Arrow(wanderForce.size(), new Stroke(1, new Color("#009999")))
	
	circle.draw(context, Vector2.add(vehicle.position(), circleCenter), true, 0);
	disp.draw(context, Vector2.add(vehicle.position(), circleCenter), false, displacement.angle());
	dist.draw(context, vehicle.position(), false, circleCenter.angle());
	forc.draw(context, vehicle.position(), false, wanderForce.angle());
	
	return wanderForce;
}

/** @interface IVehicle */
var IVehicle = function() {}

IVehicle.position	= function(){}; // Vector2
IVehicle.velocity 	= function(){}; // Vector2
IVehicle.direction	= function(){}; // Vector2
IVehicle.mass		= function(){}; // double 
IVehicle.maxSpeed	= function(){}; // double 
IVehicle.maxForce	= function(){}; // double 


