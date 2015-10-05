/**
 * Object with values that is used for all aplication
 * 
 * Dependences: Jquery, JqueryMobile
 */
 
App = {
figuraAtual:null,
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
    var item = null;
    var tipo = $(this).attr("tipo");
    if(tipo == "quadrado"){
        App.figuraAtual = App.Figuras.quadrado;
        
    }
        var elemento = $(this);
       item =  App.figuraAtual.getSVG(elemento);
    
    $("#board").html(item);
    
    $("#board  rect").attr("class",'figura');
});

}//fim init

};


App.Figuras = {
     quadrado:{
        vertices:[
        {id:"v0",x:10,y:10},
        {id:"v1",x:410,y:10},
        {id:"v2",x:410,y:410},
        {id:"v3",x:10,y:410}
        ], 
        arestas:[
            {vi:"v0",vf:"v1",d:410},
            {vi:"v1",vf:"v2",d:410},
            {vi:"v2",vf:"v3",d:410},
            {vi:"v3",vf:"v0",d:410},
            ],
         
         getSVG:function(elemento){
            var content = $("<svg   x='0' y='0' class='main figurinhas'/>").append(elemento.clone()).html();
            
            for (i = 0; i < this.vertices.length; i++)
            {
                content+= "<circle id='"+this.vertices[i].id+"' cx='"+this.vertices[i].x+"' cy='"+this.vertices[i].y+"' r='9' fill='black' class='aresta' stroke-width='10'/>";    
            }
 
             var item = "<svg   x='0' y='0' class='main figurasvg'>"+content+"</svg>";
            return item;
        },
     },
            
};

$(document).on("pagebeforecreate",function(event){
	App.init();
});

