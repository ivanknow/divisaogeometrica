/**
 * Object with values that is used for all aplication
 *
 * Dependences: Jquery, JqueryMobile
 */

var App = App || {};
App.init = function() {

	$("#board").on("mouseover", ".vertice", App.events.onMouseOverVerticeFindSecond);

	$("#board").on("click", ".vertice", App.events.onClickVerticeSelectFirst);

	$("#board").on("mousemove", ".main", App.events.onMouseMoveOnMainSVG);

	$("#board").on("mousedown", ".main", function(evt) {});

	$("#board").on("mouseup", ".main", App.events.onMouseUpRemovePrimeiro);

	$(".shape").click(App.events.onClickShapeSelectShape);

	$("#zomm_mais").on("click", App.events.zoomMais);
	$("#zomm_menos").on("click", App.events.zoomMenos);
	$("#show_vertice").on("change", function() {
		var valor = $(this).val();
		App.events.controlaVertice(valor);
	});
	//	$("#board").append("Swipe detected!"+JSON.stringify(event.swipestart.coords));
	/*	$("#board").on("swipe",App.events.divisaoSwipe);
		$("#board").on("swipeupdown",App.events.divisaoSwipe);*/



	$.event.special.swipe.start = function(event) {
		var data = event.originalEvent.touches ?
			event.originalEvent.touches[0] : event;
		desenha(event);
		return {
			time: (new Date()).getTime(),
			coords: [data.pageX, data.pageY],
			origin: $(event.target)
		};
	};


	$.event.special.swipe.stop = function(event) {
		var data = event.originalEvent.touches ?
			event.originalEvent.touches[0] : event;
		desenhaFim(event);
		return {
			time: (new Date()).getTime(),
			coords: [data.pageX, data.pageY]
		};
	}

	$("#board").on("swipe", function(e) {
		desenha(e);
	});

	$("#board").on("mouseup", function(e) {
		console.log(JSON.stringify(App.const.traco));
		var LtR = 0;
		var UtD = 0;
		if (Math.abs(App.const.traco.x1 - App.const.traco.x2) > 50) {
			if (App.const.traco.x1 > App.const.traco.x2) {
				LtR = -1;
			}
			else {
				LtR = 1;
			}
		}

		if (Math.abs(App.const.traco.y1 - App.const.traco.y2) > 50) {
			if (App.const.traco.y1 > App.const.traco.y2) {
				UtD = -1;
			}
			else {
				UtD = 1;
			}
		}

	console.log("L to R : "+LtR+"U to D:"+UtD);
	
		
	});


	function desenha(e) {
		console.log("[x:" + (e.pageX) + ", y:" + e.pageY + "]");
		App.const.traco.x1 = e.pageX || App.const.traco.x1;
		App.const.traco.y1 = e.pageY || App.const.traco.y1;
	}

	function desenhaFim(e) {

		App.const.traco.x2 = e.pageX;
		App.const.traco.y2 = e.pageY;
	}


};


$(function() {
	App.init();
});
