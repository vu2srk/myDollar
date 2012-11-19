var SelectedNodes = function(selectors){
    
    if (typeof selectors === "undefined" || selectors.trim() == "")
        return;
     
    //my$(".something div")

    var slice = Array.prototype.slice;

    this.selectedNodes = [];
    this.nodes = slice.call(document.getElementsByTagName("*"), 0);
    var allNodes = this.nodes;
    var selectedNodes = [];
    var regex = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/;

    var selectorArray = selectors.split(",");
    for (var i=0;i<selectorArray.length;i++){
        var selector = selectorArray[i];
        var subSelectors = selector.split(/(?=[ #.])/);
        for (var j=0;j<subSelectors.length;j++){
            var match = regex.exec(subSelectors[j].trim());
            if (match[0]){
                if (match[1]){
                    this.nodes = this.hasID(match[1]);
                } else if (match[2]){
                    this.nodes = this.hasTag(match[2]);
                } else if (match[3]){
                    this.nodes = this.hasClass(match[3]);
                }
            }
            if (j+1 != subSelectors.length){
                var newNodes = [];
                for (var d=0;d<this.nodes.length;d++){
                    var node = this.nodes[d];
                    newNodes = newNodes.concat(slice.call(node.getElementsByTagName("*"),0));
                }
                this.nodes = newNodes;
            }
        }
        this.selectedNodes = this.selectedNodes.concat(this.nodes);
        this.nodes = allNodes;
    }
}

SelectedNodes.prototype = {
    throwError : function(msg){
        throw new Error(msg);
    },

    hasTag : function(tagName){
        var newList = [];
        if (typeof tagName==='undefined')
            this.throwError("No tag name specified");
        else {
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
        if(typeof className === 'undefined')
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
        if(typeof id ==='undefined')
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
        for (var i=0;i<this.selectedNodes.length;i++){
            this.selectedNodes[i].style.backgroundColor = color;
        }
    },

    html : function(htmlContent){
        if (typeof htmlContent === "undefined" || htmlContent.trim()=="")
            return this.selectedNodes[0].innerHTML;
        else{
            for (var i=0;i<this.selectedNodes.length;i++){
                this.selectedNodes[i].innerHTML = htmlContent;
            }
        }
    }
    
};

var my$ = function(selectors){
    return new SelectedNodes(selectors);
}


