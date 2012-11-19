module("Selector Tests", {});

test("test class selector", function(){
    expect(1);
    var nodes = my$(".url");
    equal(nodes.selectedNodes.length, 1);
});

test("test sub-selector", function(){
    expect(2);
    var nodes = my$(".something p");
    equal(nodes.selectedNodes.length, 1); 
    equal(nodes.selectedNodes[0].id, "innerP");
});
