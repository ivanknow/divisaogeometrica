/**
 * Object with values that is used for all aplication
 * 
 * Dependences: Jquery, JqueryMobile
 */
 
 /*$('#'+app.canvasId).hover(function(e) {
			if (app.cursorDown) {
				app.draft(e);
			}
		}, function() {
			app.finishDraft();
		});
		$('#'+app.canvasId).mousemove(function(e) {
			if (app.cursorDown) {
				app.draft(e);
			}
		});
		
		$('#'+app.canvasId).mousedown(function(e) {
			app.startDraft(e);
		}).mouseup(function() {
			app.finishDraft();
		});*/
App = {
		
init : function() {//init
 

 
}
 /*$( "#board" ).on( "mousedown", ".aresta", function(evt) {
   console.log("vai rolar tracinho"+evt);
   
  // $("#board svg").append("<line x1='10' y1='10' x2='200' y2='200' style='stroke:rgb(255,0,0);stroke-width:2'></line>");
  
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('class','line');
    newLine.setAttribute('id','linemoved');
    newLine.setAttribute('x1','0');
    newLine.setAttribute('y1','0');
    newLine.setAttribute('x2',evt.pageX);
    newLine.setAttribute('y2',evt.pageY);
    $("#board svg").append(newLine);
});

 $( "#board" ).on( "mousemove", ".aresta", function(evt) {
   console.log("vai rolar tracinho"+evt);
   
  // $("#board svg").append("<line x1='10' y1='10' x2='200' y2='200' style='stroke:rgb(255,0,0);stroke-width:2'></line>");
   $("#linemoved").attr("x2",evt.pageX).attr("y2",evt.pageY);
  
});

/*$('#'+app.canvasId).mousemove(function(e) {
			if (app.cursorDown) {
				app.draft(e);
			}
		});*/

$(".shape").click(function(evt){
	       /* var cor = $(this).css("fill");
	        $("#board").html(cor);
	        var e = evt.target;
    var dim = e.getBoundingClientRect();
    var x = evt.clientX - dim.left;
    var y = evt.clientY - dim.top;
    alert("x: "+x+" y:"+y);*/
   // alert("");
    var content = $("<svg   x='0' y='0' class='main figurinhas'/>").append($(this).clone()).html();
    content+= "<circle cx='10' cy='10' r='9' fill='black' class='aresta' stroke-width='10'/>";
   content+="<line x1='10' y1='10' x2='20' y2='20' style='stroke:rgb(255,0,0);stroke-width:2' />";
    var item = "<svg   x='0' y='0' class='main figura'>"+content+"</svg>";
    
    $("#board").html(item);
    
    $("#board  rect").attr("class",'figura');
});

}//fim init

};

$(document).on("pagebeforecreate",function(event){
	App.init();
});

