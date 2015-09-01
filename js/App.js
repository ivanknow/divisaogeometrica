/**
 * Object with values that is used for all aplication
 * 
 * Dependences: Jquery, JqueryMobile
 */
App = {
canvas:null,
context:null,
resizeCanvas : function(){

App.canvas.width = $("body").innerWidth() - ($("body").innerWidth() * 0.05);
App.canvas.height = $("body").innerHeight() - ($("body").innerHeight() * 0.25);
	//aqui será carregado o derenho correto
},		
init : function() {//init

	App.canvas = document.getElementById("board");
	App.context = App.canvas.getContext('2d');
    window.addEventListener('resize', App.resizeCanvas, false);
   App.resizeCanvas();
   
 $(".shape").click(function(){
	        var cor = $(this).css("fill");
	        alert(cor);
});

}//fim init

};

$(document).on("pagebeforecreate",function(event){
	App.init();
});

