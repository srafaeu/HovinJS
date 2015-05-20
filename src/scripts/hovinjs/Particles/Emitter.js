function Emitter(position, velocity, spread) {
	this.position = position;
	this.velocity = velocity;
	this.spread = spread || Math.PI / 32; // possible angles = velocity +/- spread
	this.drawColor = "#999"; // So we can tell them apart from Fields later
}

Emitter.prototype.emitParticle = function() {
	var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);
	var magnitude = this.velocity.getMagnitude();
	
	return new Particle(new Vector2(this.position.x, this.position.y), Vector2.fromAngle(angle, magnitude));
};