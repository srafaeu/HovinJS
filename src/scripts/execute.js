var ONE_RADIANS = 0.0174532925;
var FIVE_RADIANS = 0.0872664626;
var out,
	canvas,
	context,
	playing = true,
	process = -1,
	rects = [
		{ obj: new Rectangle(new Vector2(100, 100), new Size(50, 100), new Fill(new Color("#009900"))), angle: 0 },
		{ obj: new Rectangle(new Vector2(400, 100), new Size(100, 50), new Fill(new Color("#000099"))), angle: 0 }
	];
	

$(document).ready(function(){
	out		= new ConsoleHJS();
	canvas	= document.getElementById("myCanvas"),
	context	= canvas.getContext("2d");
	
	canvas.width	= window.innerWidth - 2;
	canvas.height	= window.innerHeight - 48;
	
	$("#play").attr('href', 'javascript:void(0);').click(function() {
		if (playing) {
			playing = false;
			window.cancelAnimationFrame(process);
			$(this).removeClass("playing").html("play");
		} else {
			playing = true;
			$(this).addClass("playing").html("pause");
			loop();
		}
	});
	loop();
});

function loop() {
	clear();
	update();
	draw();
	queue();
}

function update() {
	rects[0].angle += ONE_RADIANS;
	rects[1].angle -= ONE_RADIANS;
}

function draw() {
	rects[0].obj.draw(context, rects[0].angle);
	rects[1].obj.draw(context, rects[1].angle);
	
}

function queue() {
	process = window.requestAnimationFrame(loop);
}

function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}
