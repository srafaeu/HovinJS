/*
	Description
	::public
	+	get e set Texture
	+	get e set Repetition
	+	html
	+	clone
	+	serialize / toJSON / toString

	::static
*/

/**
 * @classdesc Pattern texture to canvas objects
 * @class Pattern
 * @param {Texture} texture Texture image for pattern
 * @param {Pattern.RepeatType} repetition Type of repetition pattern on the object
 */
var Pattern = function(texture, repetition) {
	this._texture	= texture || new Texture();
	this._repeat	= "repeat";
	if (Pattern.REPETITION.toString().indexOf(repetition) > 0)
		this._repeat = repetition;
};


/* Getters and Setters */

/**
 * Get or set texture for pattern
 * @method start
 * @param {Texture|undefined} texture (set) Texture reference to pattern fill (get) undefined to get the texture reference
 * @return {Pattern|Texture} (set) Return a object reference or (get) return the texture image for pattern
 */
Pattern.prototype.texture = function(texture) {
	if (texture === undefined) return this._texture;
	this._texture = texture;
	return this;
};

/**
 * Get or set texture for pattern
 * @method start
 * @param {Texture|undefined} texture (set) Texture reference to pattern fill (get) undefined to get the texture reference
 * @return {Pattern|Texture} (set) Return a object reference or (get) return the texture image for pattern
 */
Pattern.prototype.image = Pattern.prototype.texture;

/**
 * Get or set end position of gradient
 * @method end
 * @param {Pattern.RepeatType|undefined} repetition (set) Type of repetition pattern on the object (get) undefined to get the repetition value
 * @return {Pattern|Pattern.RepeatType} (set) Return a object reference or (get) return the repetition value
 */
Pattern.prototype.repeat = function(repetition) {
	if (repetition === undefined) return this._repeat;
	if (Pattern.REPETITION.toString().indexOf(repetition) > 0)
		this._repeat = repetition;
	return this;
};


/* Html */

/**
 * Create a CanvasPattern to use as fill or stroke style
 * @method html
 * @param {CanvasRenderingContext2D} context Reference object to the Canvas Context
 * @return {CanvasPattern} Return a CanvasPattern object to use as style
 */
Pattern.prototype.html = function(context) {
	return context.createPattern(this._texture.image(), this._repeat);
}


/* Default operations */

/**
 * Clone the Pattern to a new object
 * @method clone
 * @return {Pattern} Return a new object reference
 */
Pattern.prototype.clone = function() {
	return new Pattern(this._texture, this._repeat);
}


/* Serialization */

/**
 * Serialize a object into a string
 * @method serialize
 * @return {string} Return a string JSON of the object
 */
Pattern.prototype.serialize = function() {
	return "{ texture: " + this._texture.toString() + ", repeat: " + this._repeat + " }";
};

/**
 * Serialize a object into a string
 * @method toJson
 * @return {string} Return a string JSON of the object
 */
Pattern.prototype.toJson = Pattern.prototype.serialize;

/**
 * Serialize a object into a string
 * @method toString
 * @return {string} Return a string JSON of the object
 */
Pattern.prototype.toString = Pattern.prototype.serialize;


/* Static and enumeration */

/**
 * Enum for Repeatition value types.
 * @readonly
 * @enum {string}
 */
Pattern.RepeatType	= { REPREAT: "repeat", NO_REPEAT: "no-repeat", REPEAT_X: "repeat-x", REPEAT_Y: "repeat-y" };

/**
 * Array with all RepeatType
 * @static
 */
Pattern.REPETITION	= [ Pattern.RepeatType.REPEAT, Pattern.RepeatType.NO_REPEAT, Pattern.RepeatType.REPEAT_X, Pattern.RepeatType.REPEAT_Y ];
