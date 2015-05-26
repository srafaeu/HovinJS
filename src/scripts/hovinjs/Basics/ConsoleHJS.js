/**
 * Create a console window inside HTML to show string in real time
 * @class ConsoleHJS
 * @param {object} options Id and style options for the console object (possible values: id, margin, padding, display, overflow, position, background-color, font-family, font-size, color, border, width, height, right, left, bottom, top)
 */
var ConsoleHJS = function(options) {
	/**
	 * Default options including id and style
	 * @private {object}
	 */
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
	
	/**
	 * Options in use defining id and style
	 * @public {object}
	 */
	this._options = defaults;
	
	if (options instanceof Object)
		this._options.merge(options);
	else if (typeof options == 'string')
		this._options.id = options;
}

/**
 * Create a HTMLDivElement for the console or return an exist one
 * @method create
 * @returns {HTMLDivElement} Reference to the console HTML element 
 */
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

/**
 * Create a string for the styles attributes defined in options property
 * @method createStyle
 * @returns {string} Style defined for HTML attributes
 */
ConsoleHJS.prototype.createStyle = function() {
	var attribute, value, styles = [];
	
	for (attribute in this.options) {
		value = this.options[attribute];
		
		if (value !== undefined)
			styles.push(attribute + ': ' + value  + ((typeof value == 'number') ? "px;" : ";"));
	}
	
	return styles.join("");
};


/**
 * Print a string on the console and add a new line in the end of string
 * @method debugln
 * @param {string} text String text to be printed on the console
 * @param {boolean} clear Boolean value to clear or not the console
 */
ConsoleHJS.prototype.debugln = function(text, clear) {
	this.debug(text + '<br />', clear);
};

/**
 * Print a string on the console
 * @method debug
 * @param {string} text String text to be printed on the console
 * @param {boolean} clear Boolean value to clear or not the console
 */
ConsoleHJS.prototype.debug = function(text, clear) {
	var dbg = this.create();
	
	if (clear)
		dbg.innerHTML = text;
	else
		dbg.innerHTML += text;
	
	dbg.style.display = this.options.display;
};

/**
 * Hide the console window
 * @method hide
 */
ConsoleHJS.prototype.hide = function() {
	var dbg = this.create();
	dbg.style.display = "none";
};

/**
 * Clear the console window
 * @method clear
 */
ConsoleHJS.prototype.clear = function() {
	this.create().innerHTML = "";
};
