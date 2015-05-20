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

function debug(text, clear) {
	var dbg = getDebugWindow();
	if (clear)
		dbg.innerHTML = "";
	dbg.innerHTML += text.replace(/\n/g, '<br />');
}

function getDebugWindow() {
	var dbg = document.querySelector("div#debugHovinJS");
	if (dbg == undefined) {
		bdy = document.querySelector("body");
		dbg = document.createElement("div");
		dbg.id = "debugHovinJS";
		dbg.style = "margin: 0; padding: 10px; display: block; width: 280px; height: 180px; overflow: hidden; position: absolute; right: 0px; bottom: 0px; background-color: #444; font-family: Courier New, sans-serif; font-size: 11px; color: #FEFEFE; border: 1px solid #000;";
		bdy.appendChild(dbg);
	}
	
	return dbg;
}