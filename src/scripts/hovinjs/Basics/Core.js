
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}

if (typeof Object.prototype.merge !== 'function') {
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

function inheritPrototype(childObject, parentObject) {
	var copyOfParent = Object.create(parentObject.prototype);
	copyOfParent.constructor = childObject;
	childObject.prototype = copyOfParent;
}

function addEvent(elem, evnt, funct) {
	if (elem.attachEvent)
		return elem.attachEvent('on'+evnt, funct);
	else if (elem.addEventListener)
		return elem.addEventListener(evnt, funct, false);
}

function removeEvent(elem, evnt, funct) {
	if (elem.detachEvent)
		return elem.detachEvent('on'+evnt, funct);
	else if (elem.removeEventListener)
		return elem.removeEventListener(evnt, funct, false);
}

function parseJSON(str) {
    try {
        obj = JSON.parse(str);
    } catch (e) {
        return undefined;
    }
    return obj;
}

function toString(obj) {
	var txt = "{\n";
	for (var k in obj)
		txt += "\t'" + k + "': '" + obj[k] + "'\n";
	
	txt += "}";
	return txt;
}
