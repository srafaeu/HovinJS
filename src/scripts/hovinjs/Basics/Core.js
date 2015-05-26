/* Create a static method to create object if it doesn't exist on native code */
if (typeof Object.create !== 'function') {
	/**
	 * Create an object based on existing object prototype
	 * @method create
	 * @external Object
	 * @param {object} o Reference to the object
	 */
	Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}

/* Create a method to merge object if it doesn't exist on native code */
if (typeof Object.prototype.merge !== 'function') {
	/**
	 * Create an object based on existing object prototype
	 * @method create
	 * @external Object
	 * @param {object} o Reference to the object
	 */
	Object.prototype.merge = function(obj, overwrite) {
		var attribute, c = {};
		if (overwrite !== undefined) {
			c.merge(obj);
			return c.merge(overwrite);
		} else {
			for (attribute in obj)
				this[attribute] = obj[attribute];
		}
		return this;
	}
}

/**
 * Emulate inheritance by copying prototype object from parent to children object
 * @function inheritPrototype
 * @param {object} childObject Reference to the child class that will inherit the prototype from parent
 * @param {object} parentObject Reference to the parent class
 */
function inheritPrototype(childObject, parentObject) {
	var copyOfParent = Object.create(parentObject.prototype);
	copyOfParent.constructor = childObject;
	childObject.prototype = copyOfParent;
}

/**
 * Add an event listener to a element
 * @function addEvent
 * @param {object} elem Element observed by listener
 * @param {object} evnt Type of event observed
 * @param {object} funct Function reference executed when event dispatch
 */
function addEvent(elem, evnt, funct) {
	if (elem.attachEvent)
		return elem.attachEvent('on'+evnt, funct);
	else if (elem.addEventListener)
		return elem.addEventListener(evnt, funct, false);
}

/**
 * Remove an event listener from a element
 * @function removeEvent
 * @param {object} elem Element observed by listener
 * @param {object} evnt Type of event observed
 * @param {object} funct Function reference executed when event dispatch
 */
function removeEvent(elem, evnt, funct) {
	if (elem.detachEvent)
		return elem.detachEvent('on'+evnt, funct);
	else if (elem.removeEventListener)
		return elem.removeEventListener(evnt, funct, false);
}

/**
 * Try to parse a JSON string
 * @function parseJSON
 * @param {string} str JSON string of a object
 * @return {object|undefined} Object parsed as a JSON valid string or undefined value if parser find error
 */
function parseJSON(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return undefined;
    }
}

/**
 * Convert a object into a string
 * @function toString
 * @param {object} obj Object to be read and write as string
 * @return {string} String of a object in JSON format
 */
function toString(obj) {
	var type, txt = '{';
	for (var k in obj) {
		type = typeof(obj[k]);
		if (type == 'number') {
			txt += '"' + k + '": '; // cabecalho
			txt += obj[k].toString();
		} else if (type == 'object') {
			txt += '"' + k + '": '; // cabecalho
			txt += toString(obj[k]);
		} else if (type == 'string') {
			txt += '"' + k + '": '; // cabecalho
			txt += '"' + obj[k] + '"';
		}
		txt +=  ',';
	}
	txt = txt.substring(0, txt.length - 2);
	txt += '}';
	
	return txt;
}
