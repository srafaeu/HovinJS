$(document).ready(function(){
	var t = new Test(100);
	
	debug(t.x());
});


function Test(x) {
	var x = x || 0;
	var that = this;
	
	this.x = function() {
		return x;
	}
}
