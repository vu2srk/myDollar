var SelectedNodes = function(selectors, nodes){
    if (typeof(nodes)==="undefined" || nodes.length==0)
        nodes = document.getElementsByTagName("*");
    this.nodes = nodes;
    regex = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/;
    selectorArray = selectors.split(" ");
    for (var i=0;i<selectorArray.length;i++){
        match = regex.exec(selectorArray[i].trim());
        if (match[0]){
            if (match[1]){
                this.nodes = this.hasID(match[1]);
            } else if (match[2]){
                this.nodes = this.hasTag(match[2]);
            } else if (match[3]){
                this.nodes = this.hasClass(match[3]);
            }
        }
    }
}

SelectedNodes.prototype = {
    throwError : function(msg){
        throw new Error(msg);
    },

    hasTag : function(tagName){
        var newList = [];
        if(typeof(tagName)==='undefined')
            this.throwError("No tag name specified");
        else{
            var len = this.nodes.length;
            for (var i=0;i<len;i++){
                if (this.nodes[i].tagName == tagName.toUpperCase())
                    newList.push(this.nodes[i]);
            }
        }
        return newList;
    },

    hasClass : function(className){
        var newList = [];
        if(typeof(className)==='undefined')
            this.throwError("No class name specified");
        else{
            var len = this.nodes.length;
            for (var i=0;i<len;i++){
                if (this.nodes[i].className == className)
                    newList.push(this.nodes[i]);
            }
        }
        return newList;
    },

    hasID : function(id){
        var newList = [];
        if(typeof(id)==='undefined')
            this.throwError("No id specified");
        else{
            var len = this.nodes.length;
            for (var i=0;i<len;i++){
                if (this.nodes[i].id == id)
                    newList.push(this.nodes[i]);
            }
        }
        return newList;
    },

    setBgColor : function(color){
        for (var i=0;i<this.nodes.length;i++){
            this.nodes[i].style.backgroundColor = color;
        }
    },

    html : function(htmlContent){
        if (typeof(htmlContent)==="undefined" || htmlContent.trim()=="")
            return this.nodes[0].innerHTML;
        else{
            for (var i=0;i<this.nodes.length;i++){
                this.nodes[i].innerHTML = htmlContent;
            }
        }
    }
    
};

var my$ = function(selectors){
    return new SelectedNodes(selectors);
}


