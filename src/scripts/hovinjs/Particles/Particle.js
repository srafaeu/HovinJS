function Particle(Point2, velocity, acceleration) {
	this.position = Point2 || new Vector2(0, 0);
	this.velocity = velocity || new Vector2(0, 0);
	this.acceleration = acceleration || new Vector2(0, 0);
}

Particle.prototype.move = function () {
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
};

Particle.prototype.submitToFields = function (fields) {
  var totalAccelerationX = 0;
  var totalAccelerationY = 0;
 
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
 
    var Vector2X = field.position.x - this.position.x;
    var Vector2Y = field.position.y - this.position.y;
 
    // calculate the force via MAGIC and HIGH SCHOOL SCIENCE!
    var force = field.mass / Math.pow(Vector2X * Vector2X + Vector2Y * Vector2Y, 1.5);
 
    // add to the total acceleration the force adjusted by distance
    totalAccelerationX += Vector2X * force;
    totalAccelerationY += Vector2Y * force;
  }
 
  // update our particle's acceleration
  this.acceleration = new Vector2(totalAccelerationX, totalAccelerationY);
};