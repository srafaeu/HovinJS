var ANGLE_0_RADIANS		= 0;
var ANGLE_1_RADIANS		= 0.0174532925;
var ANGLE_5_RADIANS		= 0.0872664626;
var ANGLE_90_RADIANS	= 1.57079633;
var ANGLE_180_RADIANS	= 3.14159265359;
var ANGLE_270_RADIANS	= 4.71238898;
var GRAVITY_FORCE = Vector2.fromSizeAndAngle(9.8, Angle.toRadians(90));

var out, render,
	playing = true,
	process = -1,
	textureLoaded = function(event, type, texture) {
		if (type == 'load') {
			texture.initialize();
			totalTextures++;
		} else {
			throw "Cannot load image!";
		}
	},
	timer = new Timer(),
	red = new Color("#990000"),
	green = new Color("#009900"),
	blue = new Color("#000099"),
	totalTextures = 0,
	fonts = [ new Font("time12px", "Times New Roman", 12, "px"), new Font("verd12pt", "Verdana", 20, "px"), new Font("time1em", "Times New Roman", 1.0, "em"), new Font("time1em", "Times New Roman", 1.0, "em") ],
	rttns = [ ANGLE_1_RADIANS, ANGLE_1_RADIANS, -ANGLE_1_RADIANS, -ANGLE_1_RADIANS ],
	rects, ellis, circs, squrs, polys, paths, arrws, texts, txtrs, sprts, carR, carG, carB;

$(document).ready(function(){
	render	= new Render(document.getElementById("myCanvas"), window.innerWidth - 4, window.innerHeight - 50);
	
	initialize();
	start();
	loop();
});

function initialize() {
	$("#pause").attr('href', 'javascript:void(0);').click(function() {
		playing = false;
		window.cancelAnimationFrame(process);
		timer.pause();
		$(this).hide();
		$("#play").show();
	}).show();
	
	$("#play").attr('href', 'javascript:void(0);').click(function() {
		playing = true;
		timer.start();
		loop();
		$(this).hide();
		$("#pause").show();
	}).hide();
	
	$("#rewind").attr('href', 'javascript:void(0);').click(function() {
		window.cancelAnimationFrame(process);
		playing = true;
		start();
		loop();
	});
	
	timer.start();
}

function start() {
	rects = [
		{ obj: new Rectangle(new Size(100, 50), new Fill(red)), position: new Vector2(100, 100), pivot: false, angle: 0 },
		{ obj: new Rectangle(new Size(50, 25), new Fill(green)), position: new Vector2(300, 100), pivot: true, angle: 0 },
		{ obj: new Rectangle(new Size(50, 100), new Fill(blue)), position: new Vector2(500, 100), pivot: true, angle: 0 },
		{ obj: new Rectangle(new Size(50, 50), new Fill(blue)), position: new Vector2(700, 100), pivot: new Point2(-40, -40), angle: 0 }
	];
	ellis = [
		{ obj: new Ellipse(new Size(100, 50), new Fill(red)), position: new Vector2(100, 100), pivot: false, angle: 0 },
		{ obj: new Ellipse(new Size(50, 25), new Fill(green)), position: new Vector2(300, 100), pivot: true, angle: 0 },
		{ obj: new Ellipse(new Size(50, 100), new Fill(blue)), position: new Vector2(500, 100), pivot: true, angle: 0 },
		{ obj: new Ellipse(new Size(50, 100), new Fill(blue)), position: new Vector2(700, 100), pivot: new Point2(-40, -40), angle: 0 }
	];
	circs = [
		{ obj: new Circle(25, new Stroke(1, red)), position: new Vector2(100, 100), pivot: false, angle: 0 },
		{ obj: new Circle(25, new Stroke(1, green)), position: new Vector2(300, 100), pivot: true, angle: 0 },
		{ obj: new Circle(25, new Stroke(1, blue)), position: new Vector2(500, 100), pivot: true, angle: 0 },
		{ obj: new Circle(25, new Stroke(1, blue)), position: new Vector2(700, 100), pivot: new Point2(-40, -40), angle: 0 }
	];
	squrs = [
		{ obj: new Square(50, new Fill(red)), position: new Vector2(100, 100), pivot: false, angle: 0 },
		{ obj: new Square(25, new Fill(green)), position: new Vector2(300, 100), pivot: true, angle: 0 },
		{ obj: new Square(75, new Fill(blue)), position: new Vector2(500, 100), pivot: true, angle: 0 },
		{ obj: new Square(50, new Fill(blue)), position: new Vector2(700, 100), pivot: new Point2(-40, -40), angle: 0 }
	];
	polys = [
		{ obj: new Polygon(new Size(50, 50), 3, new Fill(red)), position: new Vector2(100, 100), pivot: false, angle: 0 },
		{ obj: new Polygon(new Size(50, 50), 5, new Fill(green)), position: new Vector2(300, 100), pivot: true, angle: 0 },
		{ obj: new Polygon(new Size(50, 50), 6, new Fill(blue)), position: new Vector2(500, 100), pivot: true, angle: 0 },
		{ obj: new Polygon(new Size(50, 50), 3, new Fill(blue)), position: new Vector2(700, 100), pivot: new Point2(-40, -40), angle: 0 }
	];
	paths = [
		{ obj: new Path(new Stroke(1, red), [ new Point2(10, 50), new Point2(20, 0), new Point2(30, 50), new Point2(40, 0)]), position: new Vector2(100, 100), pivot: false, angle: 0 },
		{ obj: new Path(new Stroke(2, green), [ new Point2(50, 0), new Point2(0, 50), new Point2(50, 50)]), position: new Vector2(300, 100), pivot: true, angle: 0 },
		{ obj: new Path(new Stroke(2, blue), [ new Point2(50, 0), new Point2(0, 50), new Point2(50, 50)]), position: new Vector2(500, 100), pivot: true, angle: 0 },
		{ obj: new Path(new Stroke(5, blue), [ new Point2(-20, 40), new Point2(20, 40), new Point2(0, 0)]), position: new Vector2(700, 100), pivot: new Point2(-40, -40), angle: 0 }
	];
	arrws = [
		{ obj: new Arrow( 50, new Stroke(1, red)), position: new Vector2(100, 100), pivot: false, angle: 0 },
		{ obj: new Arrow( 25, new Stroke(1, green)), position: new Vector2(300, 100), pivot: true, angle: 0 },
		{ obj: new Arrow(100, new Stroke(1, blue)), position: new Vector2(500, 100), pivot: true, angle: 0 },
		{ obj: new Arrow( 50, new Stroke(2, blue)), position: new Vector2(700, 100), pivot: new Point2(-40, -40), angle: 0 }
	];
	texts = [
		{ obj: new Text("Abc", Text.AlignType.ALIGN_LEFT, new Fill(red)), position: new Vector2(100, 100), pivot: false, angle: 0 },
		{ obj: new Text("123", Text.AlignType.ALIGN_CENTER, new Stroke(1, green)), position: new Vector2(300, 100), pivot: true, angle: 0 },
		{ obj: new Text("END", Text.AlignType.ALIGN_RIGHT, new Fill(blue)), position: new Vector2(500, 100), pivot: true, angle: 0 },
		{ obj: new Text("Test", Text.AlignType.ALIGN_LEFT, new Fill(blue)), position: new Vector2(700, 100), pivot: new Point2(-40, -40), angle: 0 }
	];
	txtrs = [
		{ obj: new Texture("txt1", "./images/Viper.png", textureLoaded), position: new Vector2(300,  50), pivot: false, angle: 0 },
		{ obj: new Texture("txt2", "./images/Cylon.png", textureLoaded), position: new Vector2(300, 250), pivot: true, angle: 0 },
		{ obj: new Texture("txt3", "./images/Asteroids.png", textureLoaded), position: new Vector2(300, 450), pivot: true, angle: 0 },
		{ obj: new Texture("txt4", "./images/Shots.png", textureLoaded), position: new Vector2(300, 600), pivot: new Point2(-40, -40), angle: 0 }
	];
	sprts = [
		{ obj: new Sprite("spr1", "./images/Viper.png", new Size(100, 65), textureLoaded), position: new Vector2(300,  100), pivot: false, angle: 0 },
		{ obj: new Sprite("spr2", "./images/Cylon.png", new Size(100, 65), textureLoaded), position: new Vector2(300, 300), pivot: true, angle: 0 },
		{ obj: new Sprite("spr3", "./images/Asteroids.png", new Size(100, 100), textureLoaded), position: new Vector2(800, 100), pivot: true, angle: 0 },
		{ obj: new Sprite("spr4", "./images/Shots.png", new Size(20, 10), textureLoaded), position: new Vector2(800, 300), pivot: new Point2(-40, -40), angle: 0 }
	];
	carR = new Car(new Vector2(50, 50), ANGLE_0_RADIANS, red);
	carG = new Car(new Vector2(1000, 100), ANGLE_180_RADIANS, green);
	carB = new Car(new Vector2(100, 500), -ANGLE_5_RADIANS * 4, blue);

	timer.stop();
	timer.start();
}

function loop() {
	clear();
	update();
	draw();
	queue();
}

function update() {
	//out.debug(timer.currentElapsedTime() + " / " + timer.totalElapsedTime(), true);
	
	//carR.update(timer, carG);
	//carG.update(timer);
	//carB.update(timer, carG);
	
	//updateRotation(rects, rttns);
}

function draw() {
	//drawCars();
	
	//drawShapes(rects);
	//drawShapes(ellis);
	//drawShapes(squrs);
	//drawShapes(polys);
	//drawShapes(circs);
	//drawShapes(paths);
	//drawShapes(arrws);
	//drawTexts(texts);
	//drawSprites(sprts, totalTextures, 4);
	//drawTextures(txtrs, totalTextures, 4);
}

function queue() {
	timer.update();
	process = window.requestAnimationFrame(loop);
}

function clear() {
	render.clear();
}


/* ******************** UPDATE FUNCTIONS ******************** */

function updateRotation(objects, rotations) {
	var i = 0, l = 0;
	for (i = 0, l = objects.length; i < l; i++)
		objects[i].angle += rotations[i];
}


/* ********************* DRAW FUNCTIONS ********************* */

function drawCars() {
	carR.draw(render.context());
	carG.draw(render.context());
	carB.draw(render.context());
}

function drawShapes(objects) {
	var i = 0, l = 0;
	for (i = 0, l = objects.length; i < l; i++)
		objects[i].obj.draw(render.context(), objects[i].position, objects[i].pivot, objects[i].angle);
}

function drawTextures(objects, current, total) {
	var i = 0, l = 0;
	if (current >= total) {
		for (i = 0, l = objects.length; i < l; i++)
			objects[i].obj.draw(render.context(), objects[i].position, objects[i].pivot, objects[i].angle);
	}
}

function drawSprites(objects, current, total) {
	var i = 0, l = 0;
	if (current >= total) {
		for (i = 0, l = objects.length; i < l; i++) {
			objects[i].obj.draw(render.context(), 2, objects[i].position, objects[i].pivot, objects[i].angle);
			
			render.context().fillStyle = 'rgba(0, 0, 255, 1)';
			render.context().fillRect(objects[i].position.x(), objects[i].position.y(), 3, 3);
		}
	}
}

function drawTexts(objects) {
	var i = 0, l = 0;
	for (i = 0, l = objects.length; i < l; i++)
		objects[i].obj.draw(render.context(), fonts[i], objects[i].position, objects[i].pivot, objects[i].angle);
}





