/**
 * Object with values that is used for all aplication
 *
 * Dependences: Jquery, JqueryMobile
 */

var App = App || {};
App.init = function() {
		//mouse
		$("#board").on("mouseover", ".vertice", App.events.onMouseOverVerticeFindSecond);

		$("#board").on("click",".vertice",App.events.onClickVerticeSelectFirst);

		$("#board").on("mousemove",	".main", App.events.onMouseMoveOnMainSVG);

		$("#board").on("mousedown", ".main", function(evt) {});

		$("#board").on("mouseup", ".main", App.events.onMouseUpRemovePrimeiro);

		$(".shape").click( App.events.onClickShapeSelectShape);
		//touch

	};


$(function(){
	App.init();
});
