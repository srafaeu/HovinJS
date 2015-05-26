var out;

$(document).ready(function(){
	out = new ConsoleHJS();
	
	
	var t = { a: "abc", b: 5, c: { type: 'string', value: 10 }, d: "final" };
	
	
	alert(toString(t));
	
});
