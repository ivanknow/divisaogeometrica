/**
 * Object with values that is used for all aplication
 *
 * Dependences: Jquery, JqueryMobile
 */

var App = App || {};
App.init = function() {
		//mouse
		$("#board").on("vmouseover", ".vertice", App.events.onMouseOverVerticeFindSecond);

/*		$(".shape").on("swipe",function(){
    $("#titulo").text("Swipe detected!");
	});*/

	/*	$(".vertice").on("swipe",function(){
		$("#titulo").text("Swipe detected!");
	});*/
		//$("#board").on("click",".vertice",App.events.onClickVerticeSelectFirst);
		$("#board").on("tap",".vertice",App.events.onClickVerticeSelectFirst);

		$("#board").on("vmousemove",	".main", App.events.onMouseMoveOnMainSVG);

	//	$("#board").on("mousedown", ".main", function(evt) {});

		$("#board").on("vmouseup", ".main", App.events.onMouseUpRemovePrimeiro);

		//$(".shape").click( App.events.onClickShapeSelectShape);*/
		//touch
		$(".shape").on("tap",App.events.onClickShapeSelectShape);



	};


$(function(){
	App.init();
});
