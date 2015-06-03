var ONE_RADIANS = 0.0174532925;
var FIVE_RADIANS = 0.0872664626;
var out, canvas, context,
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
	red = new Color("#990000"),
	green = new Color("#009900"),
	blue = new Color("#000099"),
	totalTextures = 0,
	fonts = [ new Font("time12px", "Times New Roman", 12, "px"), new Font("verd12pt", "Verdana", 20, "pt"), new Font("time1em", "Times New Roman", 1.0, "em") ],
	//rects = [ { obj: new Rectangle(new Size(50, 100), new Fill(new Color("#990000"))), angle: 0 }, { obj: new Rectangle(new Vector2(300, 100), new Size(50, 50), new Fill(new Color("#009900"))), angle: 0 }, { obj: new Rectangle(new Vector2(500, 100), new Size(100, 50), new Fill(new Color("#000099"))), angle: 0 } ],
	//ellis = [ { obj: new Ellipse(new Size(50, 100), new Fill(new Color("#990000"))), angle: 0 }, { obj: new Ellipse(new Vector2(300, 100), new Size(50, 50), new Fill(new Color("#009900"))), angle: 0 }, { obj: new Ellipse(new Vector2(500, 100), new Size(100, 50), new Fill(new Color("#000099"))), angle: 0 } ],
	circs = [
		{ obj: new Circle( 50, new Fill(red)), position: new Vector2(100, 100), centered: false, angle: 0 },
		{ obj: new Circle( 25, new Fill(green)), position: new Vector2(300, 100), centered: true, angle: 0 },
		{ obj: new Circle(100, new Fill(blue)), position: new Vector2(500, 100), centered: true, angle: 0 }
	],
	//squas = [ { obj: new Square(50, new Fill(new Color("#990000"))), angle: 0 }, { obj: new Square(new Vector2(300, 100), 25, new Fill(new Color("#009900"))), angle: 0 }, { obj: new Square(new Vector2(500, 100), 100, new Fill(new Color("#000099"))), angle: 0 } ],
	//polys = [ { obj: new Polygon(new Size(50, 50), 3, new Fill(new Color("#990000"))), angle: 0 }, { obj: new Polygon(new Vector2(300, 100), new Size(50, 50), 5, new Fill(new Color("#009900"))), angle: 0 }, { obj: new Polygon(new Vector2(500, 100), 100, 10, new Fill(new Color("#000099"))), angle: 0 } ],
	//paths = [ { obj: new Path(new Stroke(1, new Color("#990000")), [ new Point2(10, 50), new Point2(20, 0), new Point2(30, 50), new Point2(40, 0)]), angle: 0 }, { obj: new Path(new Vector2(300, 100), new Stroke(2, new Color("#009900")), [ new Point2(50, 0), new Point2(0, 50), new Point2(50, 50)]), angle: 0 }, { obj: new Path(new Vector2(500, 100), new Stroke(5, new Color("#000099")), [ new Point2(-20, 40), new Point2(20, 40), new Point2(0, 0)]), angle: 0 } ],
	arrws = [
		{ obj: new Arrow( 50, new Stroke(1, red)), position: new Vector2(100, 100), centered: false, angle: 0 },
		{ obj: new Arrow( 25, new Stroke(1, green)), position: new Vector2(300, 100), centered: true, angle: 0 },
		{ obj: new Arrow(100, new Stroke(1, blue)), position: new Vector2(500, 100), centered: true, angle: 0 }
	],
	//texts = [ { obj: new Text("Abc", Text.AlignType.ALIGN_LEFT, new Fill(new Color("#990000"))), position: , angle: 0 }, { obj: new Text(new Vector2(100, 200), "123", Text.AlignType.ALIGN_CENTER, new Stroke(1, new Color("#009900"))), angle: 0 }, { obj: new Text(new Vector2(100, 300), "END", Text.AlignType.ALIGN_RIGHT, new Fill(new Color("#000099"))), angle: 0 } ],
	carR = new Car(new Vector2(50, 50), red),
	carG = new Car(new Vector2(1000, 300), green),
	carB = new Car(new Vector2(50, 50), blue);

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
	//circs[0].angle += ONE_RADIANS;
	//circs[1].angle += ONE_RADIANS;
	//circs[2].angle += ONE_RADIANS;
}

function draw() {
	//drawShapes(rects);
	//drawShapes(ellis);
	drawShapes(circs);
	//drawShapes(squas);
	//drawShapes(polys);
	//drawShapes(paths);
	//drawShapes(arrws);
	//drawTexts(texts);
}

function queue() {
	process = window.requestAnimationFrame(loop);
}

function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}


function drawCars() {
	carR.draw(context);
	carG.draw(context);
	carB.draw(context);
}

function drawShapes(objects) {
	var i = 0, l = 0;
	for (i = 0, l = objects.length; i < l; i++)
		objects[i].obj.draw(context, objects[i].position, objects[i].centered, objects[i].angle);
}

function drawTextures(objects, current, total) {
	var i = 0, l = 0;
	if (current >= total) {
		for (i = 0, l = objects.length; i < l; i++)
			objects[i].obj.draw(context, true, objects[i].position, objects[i].angle);
	}
}

function drawSprites(objects, current, total) {
	var i = 0, l = 0;
	if (current >= total) {
		for (i = 0, l = objects.length; i < l; i++)
			objects[i].obj.draw(context, true, 2, objects[i].position, objects[i].angle);
	}
}

function drawTexts(objects) {
	var i = 0, l = 0;
	for (i = 0, l = objects.length; i < l; i++)
		objects[i].obj.draw(context, fonts[i], objects[i].angle);
}







/*
	rects = [ { obj: new Rectangle(new Vector2(100, 100), new Size(50, 100), new Fill(new Color("#990000"))), angle: 0 }, { obj: new Rectangle(new Vector2(300, 100), new Size(50, 50), new Fill(new Color("#009900"))), angle: 0 }, { obj: new Rectangle(new Vector2(500, 100), new Size(100, 50), new Fill(new Color("#000099"))), angle: 0 } ],
	ellis = [ { obj: new Ellipse(new Vector2(100, 100), new Size(50, 100), new Fill(new Color("#990000"))), angle: 0 }, { obj: new Ellipse(new Vector2(300, 100), new Size(50, 50), new Fill(new Color("#009900"))), angle: 0 }, { obj: new Ellipse(new Vector2(500, 100), new Size(100, 50), new Fill(new Color("#000099"))), angle: 0 } ],
	circs = [ { obj: new Circle(new Vector2(100, 100), 50, new Fill(new Color("#990000"))), angle: 0 }, { obj: new Circle(new Vector2(300, 100), 25, new Fill(new Color("#009900"))), angle: 0 }, { obj: new Circle(new Vector2(500, 100), 100, new Fill(new Color("#000099"))), angle: 0 } ],
	squas = [ { obj: new Square(new Vector2(100, 100), 50, new Fill(new Color("#990000"))), angle: 0 }, { obj: new Square(new Vector2(300, 100), 25, new Fill(new Color("#009900"))), angle: 0 }, { obj: new Square(new Vector2(500, 100), 100, new Fill(new Color("#000099"))), angle: 0 } ],
	polys = [ { obj: new Polygon(new Vector2(100, 100), new Size(50, 50), 3, new Fill(new Color("#990000"))), angle: 0 }, { obj: new Polygon(new Vector2(300, 100), new Size(50, 50), 5, new Fill(new Color("#009900"))), angle: 0 }, { obj: new Polygon(new Vector2(500, 100), 100, 10, new Fill(new Color("#000099"))), angle: 0 } ],
	paths = [ { obj: new Path(new Vector2(100, 100), new Stroke(1, new Color("#990000")), [ new Point2(10, 50), new Point2(20, 0), new Point2(30, 50), new Point2(40, 0)]), angle: 0 }, { obj: new Path(new Vector2(300, 100), new Stroke(2, new Color("#009900")), [ new Point2(50, 0), new Point2(0, 50), new Point2(50, 50)]), angle: 0 }, { obj: new Path(new Vector2(500, 100), new Stroke(5, new Color("#000099")), [ new Point2(-20, 40), new Point2(20, 40), new Point2(0, 0)]), angle: 0 } ],
	arrws = [ { obj: new Arrow(new Vector2(100, 100), 50, new Stroke(1, new Color("#990000"))), angle: 0 }, { obj: new Arrow(new Vector2(300, 100), 25, new Stroke(2, new Color("#009900"))), angle: 0 }, { obj: new Arrow(new Vector2(500, 100), 100, new Stroke(3, new Color("#000099"))), angle: 0 } ],
	texts = [ { obj: new Text(new Vector2(100, 100), "Abc", Text.AlignType.ALIGN_LEFT, new Fill(new Color("#990000"))), angle: 0 }, { obj: new Text(new Vector2(100, 200), "123", Text.AlignType.ALIGN_CENTER, new Stroke(1, new Color("#009900"))), angle: 0 }, { obj: new Text(new Vector2(100, 300), "END", Text.AlignType.ALIGN_RIGHT, new Fill(new Color("#000099"))), angle: 0 } ],
	txtrs = [ { obj: new Texture("txt1", "/images/Viper.png", textureLoaded), position: new Vector2(300, 100), angle: 0 }, { obj: new Texture("txt2", "/images/Cylon.png", textureLoaded), position: new Vector2(300, 300), angle: 0 }, { obj: new Texture("txt2", "/images/Asteroids.png", textureLoaded), position: new Vector2(300, 500), angle: 0 } ],
	sprts = [ { obj: new Sprite("txt1", "/images/Viper.png", new Size(100, 65), textureLoaded), position: new Vector2(100, 100), angle: 0 }, { obj: new Sprite("txt2", "/images/Cylon.png", new Size(100, 65), textureLoaded), position: new Vector2(100, 300), angle: 0 }, { obj: new Sprite("txt2", "/images/Asteroids.png", new Size(100, 100), textureLoaded), position: new Vector2(100, 500), angle: 0 } ],
*/


/*


 * @param {Vector2|Point2} position A point or vector object to define the position of the object
 * @param {boolean} centered True if the draw is based on the center or false if is based on the top left

, position, centered

	if (centered) {
		x0 = -(w / 2);
		y0 = -(h / 2);
	} else {
		x0 = 0;
		y0 = 0;
	}
	
	
	if (centered)
		point0 = new Point(-(w / 2), -(h / 2));


*/