/* class Random */
var Random = function() {};

Random.prototype.next = function() {
	return Math.random();
};

Random.prototype.nextInt = function(max, zero) {
	return Math.floor(nextFloat(max, zero));
};

Random.prototype.nextFloat = function(max, zero) {
	var r = 0;
	var m = max || 1;
	var z = zero || false;
	
	if (z)
		r = Math.random() * (m + 1);
	else
		r = (Math.random() * (m)) + 1;
	
	return r;
};
