var ConsoleHJS = function(options) {
	var defaults = {
		"id":				"consoleHovinJS",
		"margin":			0,
		"padding":			10,
		"display":			"block",
		"overflow":			"hidden",
		"position":			"absolute",
		"background-color":	"#444",
		"font-family":		"Courier New, sans-serif",
		"font-size":		"11px",
		"color":			"#FEFEFE",
		"border":			"1px solid #000",
		"width":			280,
		"height":			180,
		"right":			0,
		"left":				undefined,
		"bottom":			0,
		"top":				undefined,
	};
	
	this._options = defaults;
	
	if (options instanceof Object)
		this._options.merge(options);
	else if (typeof options == 'string')
		this._options.id = options;
}

ConsoleHJS.prototype.create = function() {
	var dbg = document.querySelector("div#" + this.options.id);
		
	if (dbg == undefined) {
		bdy = document.querySelector("body");
		dbg = document.createElement("div");
		
		dbg.id = this.options.id;
		dbg.style = this.createStyle();
		
		bdy.appendChild(dbg);
	}
	return dbg;
};

ConsoleHJS.prototype.createStyle = function() {
	var attribute, value, styles = [];
	
	for (attribute in this.options) {
		value = this.options[attribute];
		
		if (value !== undefined)
			styles.push(attribute + ': ' + value  + ((typeof value == 'number') ? "px;" : ";"));
	}
	
	return styles.join("");
};

ConsoleHJS.prototype.debugln = function(text, clear) {
	this.debug(text + '<br />', clear);
};

ConsoleHJS.prototype.debug = function(text, clear) {
	var dbg = this.create();
	if (clear)
		dbg.innerHTML = "";
	dbg.innerHTML += text;
	dbg.style.display = this.options.display;
};

ConsoleHJS.prototype.hide = function() {
	var dbg = this.create();
	dbg.style.display = "none";
};

ConsoleHJS.prototype.clear = function() {
	this.create().innerHTML = "";
};
