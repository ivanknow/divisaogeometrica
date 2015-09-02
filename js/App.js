/**
 * Object with values that is used for all aplication
 * 
 * Dependences: Jquery, JqueryMobile
 */
App = {
		
init : function() {//init

   
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
    var item = "<svg   x='0' y='0' class='main figurinhas'>"+content+"</svg>";
    $("#board").html(item);
});

}//fim init

};

$(document).on("pagebeforecreate",function(event){
	App.init();
});

