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
mousePressed:false,
arestaPressedX:0,
arestaPressedY:0,

init : function() {//init
 $( "#board" ).on( "mouseover", ".aresta", function(evt) {
     var hasClass = $(this).attr("class");
// console.log("eh a primeira?"+hasClass);
        if(hasClass != "primeira aresta"){     
        
        
        var p = $( this );
        var position = p.position();
      
        $("#linemoved").attr("x2",position.left-8);
        $("#linemoved").attr("y2",position.top-52); 
        
        $("#linemoved").attr("id","elemento");
        
        }
        $(".primeira").attr("class","aresta");
        
 });
 
 $( "#board" ).on( "click", ".aresta", function(evt) {
    
     App.mousePressed = true;
    
    //  console.log("clicou na aresta");
    
    $(this).attr("class","primeira aresta");
   
    //console.log("salva x e y:"+evt.pageX+" - "+evt.pageY);
    
    var p = $( this );
    var position = p.position();
   
   // console.log( "left: " + position.left + ", top: " + position.top );
    
    App.arestaPressedX=position.left;
    App.arestaPressedY=position.top;
    
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('class','line');
    newLine.setAttribute('id','linemoved');
    newLine.setAttribute('x1',position.left-8);
    newLine.setAttribute('y1',position.top-52);
    newLine.setAttribute('x2',position.left-8);
    newLine.setAttribute('y2',position.top-52);
    
    $("#board svg").append(newLine);
 });
  $( "#board" ).on( "mousemove", ".main", function(evt) {
      console.log(App.mousePressed );
      if(App.mousePressed === true){
    // console.log("arrastando mouse na figura");
     //console.log("salva x e y:"+evt.pageX+" - "+evt.pageY);
     $("#linemoved").attr("x2",evt.pageX-8).attr("y2",evt.pageY-52);   
      }
  
 });
 
 $( "#board" ).on( "mousedown", ".main", function(evt) {
   //  console.log("mouse apertado na figura");
     
   //console.log("salva x e y:"+evt.pageX+" - "+evt.pageY);
 });
 
  $( "#board" ).on( "mouseup", ".main", function(evt) {
      App.mousePressed = false;
 //    console.log(" mouse solto na figura");
 //    console.log("salva x e y:"+evt.pageX+" - "+evt.pageY);
     
     $("#linemoved").remove();
 });

$(".shape").click(function(evt){

    var content = $("<svg   x='0' y='0' class='main figurinhas'/>").append($(this).clone()).html();
    content+= "<circle cx='10' cy='10' r='9' fill='black' class='aresta' stroke-width='10'/>";
    content+= "<circle cx='410' cy='10' r='9' fill='black' class='aresta' stroke-width='10'/>";
    content+= "<circle cx='410' cy='410' r='9' fill='black' class='aresta' stroke-width='10'/>";
    content+= "<circle cx='10' cy='410' r='9' fill='black' class='aresta' stroke-width='10'/>";
 
    var item = "<svg   x='0' y='0' class='main figurasvg'>"+content+"</svg>";
    
    $("#board").html(item);
    
    $("#board  rect").attr("class",'figura');
});

}//fim init

};

$(document).on("pagebeforecreate",function(event){
	App.init();
});

