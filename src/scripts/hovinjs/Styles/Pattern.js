/* class Pattern */
var Pattern = function(texture, repetition) {
	this._texture	= texture || new Texture();
	this._repeat	= "repeat";
	if (Pattern.REPETITION.toString().indexOf(repetition) > 0)
		this._repeat = repetition;
};

Pattern.REPEAT		= "repeat";
Pattern.NO_REPEAT	= "no-repeat";
Pattern.REPEAT_X	= "repeat-x";
Pattern.REPEAT_Y	= "repeat-y";
Pattern.REPETITION	= [ Pattern.REPEAT, Pattern.NO_REPEAT, Pattern.REPEAT_X, Pattern.REPEAT_Y ];

/* Getters and Setters */

Pattern.prototype.image = 
Pattern.prototype.texture = function(texture) {
	if (texture === undefined) return this._texture;
	this._texture = texture;
	return this;
};

Pattern.prototype.repeat = function(repetition) {
	if (repetition === undefined) return this._repeat;
	if (Pattern.REPETITION.toString().indexOf(repetition) > 0)
		this._repeat = repetition;
	return this;
};

/* Html */
Pattern.prototype.html = function(context) {
	return context.createPattern(this._texture.image(), this._repeat);
}


/* Serialization */

Pattern.prototype.toJson = 
Pattern.prototype.toString = 
Pattern.prototype.serialize = function() {
	return "{ texture: " + this._texture.toString() + ", repeat: " + this._repeat + " }";
};

