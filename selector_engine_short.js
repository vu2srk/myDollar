(function(window) {

	var slice = Array.prototype.slice;
	var push = Array.prototype.push;
    var document = window.document;

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

			push.apply(this, slice.call(document.querySelectorAll(selectors.trim()), 0));
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

