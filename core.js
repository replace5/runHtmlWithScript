(function(window, document) {

	function noop(){}

	function scriptLoad(script, load) {
		if (!isFunction(load)) {
			return;
		}
		if (script.addEventListener) {
			script.onload = load;
		} else {
			script.onreadystatechange = function() {
				if (script.readyState in {
					loaded: 1,
					complete: 1
				}) {
					script.onreadystatechange = null;
					load();
				}
			}
		}
	}
	function stringToNode(string) {
		var nodes = [];
		var elm = document.createElement("div");
		elm.innerHTML = "tagmanager<div>" + string + "</div>";
		for (var last = elm.lastChild; last.firstChild;) {
			nodes.push(last.removeChild(last.firstChild));
		}
		return nodes;
	}
	function insertDom(target, nodes, success, fail) {
		var that = this;
		var outer = arguments.callee;
		return function() {
			try {
				if (nodes.length > 0) {
					var elm = nodes.shift();
					var selfRun = outer(target, nodes, success, fail);

					if (elm.nodeName === 'SCRIPT' && elm.type === "text/shellyscript") {
						var script = document.createElement('script');
						script.async = false;
						script.type = "text/javascript";
						script.id = elm.id;
						script.text = elm.text || elm.textContent || elm.innerHTML || "";
						if (elm.charset) {
							script.charset = elm.charset;
						}
						var src = elm.getAttribute('data-shellysrc');
						if (src) {
							script.src = src;
							scriptLoad(script, selfRun);
						}
						target.insertBefore(script, null);
					} else if (elm.innerHTML && elm.innerHTML.toLowerCase().indexOf("<script") > -1) {
						outer(elm, that.stringToNode(elm.innerHTML), selfRun, fail);
					} else {
						target.insertBefore(elm, null);
						selfRun();
					}
				} else {
					success();
				}
			} catch(e) {fail();}
		}
	}

	var scriptSrcReplacer = /(<script.*?)src\s*(?=\=\s*")/gi;
	var scriptTypeReplacer = /(<script.*?)(\s*type\s*\=\s*"text\/javascript")?(.*?>)/gi;
	function prepareHtml(string) {
		return String(string).replace(scriptSrcReplacer, "$1data-shellysrc").replace(scriptTypeReplacer, "$1 type='text/shellyscript'$3");
	}

	function html(target, string, success, fail) {
		success = success || noop;
		fail = fail || noop;
		string = prepareHtml(string);
		insertDom(target, stringToNode(string), success, fail)();
	}
	window.runHtmlWithScript = html;
})(window, document)