(function(window) {

	var slice = Array.prototype.slice;
	var push = Array.prototype.push;

	function contains(list, item) {
		for (var i = 0; i < list.length; i++) {
			if (item === list[i])
				return true;
		}
		return false;
	}

	function unique(list) {
		var newList = [];
		for (var i = 0; i < list.length; i++) {
			if (!contains(newList, list[i]))
				newList.push(list[i]);
		}
		return newList;
	}

	var my$ = function(selectors) {
		return new my$.fn.init(selectors);
	}

	my$.fn = my$.prototype = {
		init : function(selectors) {

			if ( typeof selectors === "undefined" || selectors.trim() == "")
				return;

			var selectedNodes = [];
			var nodes = slice.call(document.getElementsByTagName("*"), 0);
			var allNodes = nodes;
			var selectedNodes = [];

			var selectorRegexes = [{
				re : /^(?:(\w+))$/,
				fn : hasTag
			}, {
				re : /^(?:#([\w\-]+))$/,
				fn : hasID
			}, {
				re : /^(?:\.([\w\-]+))$/,
				fn : hasClass
			}];

			var selectorArray = selectors.split(",");
			for (var i = 0; i < selectorArray.length; i++) {
				var eachSelectors = selectorArray[i].trim().split(/(?=[ #.])/);
				selectedNodes = selectedNodes.concat(processSelector(eachSelectors, nodes, selectorRegexes, []));
				nodes = allNodes;
			}
			selectedNodes = unique(selectedNodes);
			push.apply(this, slice.call(selectedNodes, 0));
			return this;
		},
		setBgColor : function(color) {
			for (var i = 0; i < this.length; i++) {
				this[i].style.backgroundColor = color;
			}
		},

		html : function(htmlContent) {
			if ( typeof htmlContent === "undefined" || htmlContent.trim() == "")
				return this[0].innerHTML;
			else {
				for (var i = 0; i < this.length; i++) {
					this[i].innerHTML = htmlContent;
				}
			}
		}
	}

	my$.fn.init.prototype = my$.prototype;

	function processSelector(selectors, nodes, selectorRegexes, selectedNodes) {
		if (selectors.length == 0)
			return selectedNodes;
		else {
			var newNodes = [];
			for (var k = 0; k < selectorRegexes.length; k++) {
				var match = selectorRegexes[k].re.exec(selectors[0].trim());
				if (match) {
					nodes = selectorRegexes[k].fn(match[1], nodes);
					for (var n = 0; n < nodes.length; n++) {
						var node = nodes[n];
						newNodes = newNodes.concat(slice.call(node.getElementsByTagName("*"), 0));
					}
				}
			}
			selectors.splice(0, 1);
			return processSelector(selectors, newNodes, selectorRegexes, nodes);
		}
	}

	function throwError(msg) {
		throw new Error(msg);
	}

	function hasTag(tagName, nodes) {
		var newList = [];
		if ( typeof tagName === 'undefined')
			throwError("No tag name specified");
		else {
			var len = nodes.length;
			for (var i = 0; i < len; i++) {
				if (nodes[i].tagName == tagName.toUpperCase())
					newList.push(nodes[i]);
			}
		}
		return newList;
	}

	function hasClass(className, nodes) {
		var newList = [];
		if ( typeof className === 'undefined')
			throwError("No class name specified");
		else {
			var len = nodes.length;
			for (var i = 0; i < len; i++) {
				if (nodes[i].className == className)
					newList.push(nodes[i]);
			}
		}
		return newList;
	}

	function hasID(id, nodes) {
		var newList = [];
		if ( typeof id === 'undefined')
			throwError("No id specified");
		else {
			var len = nodes.length;
			for (var i = 0; i < len; i++) {
				if (nodes[i].id == id)
					newList.push(nodes[i]);
			}
		}
		return newList;
	}


	window.my$ = my$;

})(window)

