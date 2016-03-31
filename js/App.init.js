/**
 * Object with values that is used for all aplication
 *
 * Dependences: Jquery, JqueryMobile
 */

var App = App || {};
App.init = function() {
		//mouse
		$("#board").on("vmousedown", ".vertice", App.events.onMouseOverVerticeFindSecond);

		$("#board").on("click",".vertice",App.events.onClickVerticeSelectFirst);

		//$("#board").on("vmousemove",	".main", App.events.onMouseMoveOnMainSVG);

	//	$("#board").on("mousedown", ".main", function(evt) {});

		$("#board").on("vmouseup", ".main", App.events.onMouseUpRemovePrimeiro);

		//$(".shape").click( App.events.onClickShapeSelectShape);*/
		//touch
		$(".shape").on("tap",App.events.onClickShapeSelectShape);

		$("#zomm_mais").on("click",App.events.zoomMais);
		$("#zomm_menos").on("click",App.events.zoomMenos);

	};


$(function(){
	App.init();
});
