/**
 * Object with values that is used for all aplication
 *
 * Dependences: Jquery, JqueryMobile
 */

var App = App || {};
App.init = function() {

	$("#board").on("mouseover", ".vertice", App.events.onMouseOverVerticeFindSecond);

	$("#board").on("click", ".vertice", App.events.onClickVerticeSelectFirst);

	//$("#board").on("mousemove", ".main", App.events.onMouseMoveOnMainSVG);

	$("#board").on("mousedown", ".main", function(evt) {});

	$("#board").on("mouseup", ".main", App.events.onMouseUpRemovePrimeiro);

	$(".shape").click(App.events.onClickShapeSelectShape);

	$("#zomm_mais").on("click", App.events.zoomMais);
	
	$("#zomm_menos").on("click", App.events.zoomMenos);
/*	$("#show_vertice").on("change", function() {
		var valor = $(this).val();
		App.events.controlaVertice(valor);
	});*/
	$("#show_numero").on("change",App.events.changeCheckExibeNumeros);
	$("#show_vertices").on("change",App.events.changeCheckExibeVertices);
	$("#board").on("click","text",function(){
		
		$("#btnModalReta").click();
	});

//	$("#board").on("swipe", App.events.startSwipe);

/*	$("#board").on("vmouseup", App.events.fimSwipe);

	$.event.special.swipe.start = function(event) {
		var data = event.originalEvent.touches ?
			event.originalEvent.touches[0] : event;
		//EVENT	
		App.events.startSwipe(event);

		return {
			time: (new Date()).getTime(),
			coords: [data.pageX, data.pageY],
			origin: $(event.target)
		};
	};


	$.event.special.swipe.stop = function(event) {
		var data = event.originalEvent.touches ?
			event.originalEvent.touches[0] : event;
		//EVENT
		App.events.updateSwipe(event);

		return {
			time: (new Date()).getTime(),
			coords: [data.pageX, data.pageY]
		};
	},
	$("#limpaLog").on("click", function(){
			$("#swipeLog").text("");
	});*/
};


$(function() {
	App.init(); //thiago dando trabalho
});
