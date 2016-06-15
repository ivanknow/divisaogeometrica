/**
 * Object with values that is used for all aplication
 *
 * Dependences: Jquery, JqueryMobile
 */

var App = App || {};

App.events = {
	onClickVerticeSelectFirst: function(evt) {
		App.const.mousePressed = true;

		$(this).attr("class", "primeiro vertice");

		var vid = $(this).attr("id");

		var priibidas = getProibidas(vid, App.figuraAtual);
		for (var i = 0; i < priibidas.length; i++) {
			$("#" + priibidas[i]).attr("class", "proibida vertice");
		}

		//legado
	/*	var p = $(this);

		var newLine = geraLinha($(this).attr("cx"),
			$(this).attr("cy"), $(this).attr("cx"),
			$(this).attr("cy"));
		newLine.setAttribute('id', 'linemoved');
		newLine.setAttribute("stroke-dasharray", "20,20");

		$("#board svg").append(newLine);

		//legado*/

	},
	onMouseOverVerticeFindSecond: function(evt) {

		var hasClass = $(this).attr("class");
		if (hasClass != "primeiro vertice" && hasClass != "proibida vertice" && App.const.mousePressed) {
			// se nao for o primeiro ou proibida ele termina

			var id1 = $(".primeiro").attr("id");
			var id2 = $(this).attr("id");

			/*/legado
			var p = $(this);
			var position = p.position();
			var topMargin = $(".figurasvg").offset().top;
			var leftMargin = $(".figurasvg").offset().left;
			$("#linemoved").attr("x2", position.left - topMargin - App.const.margin);
			$("#linemoved").attr("y2", position.top - leftMargin - App.const.margin);
			$("#linemoved").removeAttr("id");

			//legado*/


			App.const.mousePressed = false;


			//inserir ponto medio
			inserePontoMedio(id1, id2, App.figuraAtual);

			var item = App.figuraAtual.updateSVG();

			$("#board").html(item);
			$(".primeiro").attr("class", "vertice");
			$(".proibida").attr("class", "vertice");
		}

	},
	onClickShapeSelectShape: function(evt) {
		var item = null;
		var tipo = $(this).attr("tipo");

		App.figuraAtual = Object.create(App.Figuras);
		App.figuraAtual.init(tipo);

		//var elemento = $(this);
		item = App.figuraAtual.getSVG();

		$("#board").html(item);

		$("#board  rect").attr("class", 'figura');

	},
	onMouseUpRemovePrimeiro: function(evt) {
		App.const.mousePressed = false;
		$(".primeiro").attr("class", "vertice");
		$(".proibida").attr("class", "vertice");
		$("#linemoved").remove();
	},
	onMouseMoveOnMainSVG: function(evt) {
		if (App.const.mousePressed === true) {
			var topMargin = $(".figurasvg").offset().top;
			var leftMargin = $(".figurasvg").offset().left;
			$("#linemoved")
				.attr("x2", evt.pageX - leftMargin - App.const.margin)
				.attr("y2", evt.pageY - topMargin - App.const.margin);
		}
	},
	zoomMais: function() {
		App.figuraAtual.viewBox ? function() {
				App.figuraAtual.viewBox.width -= 100;
				var item = App.figuraAtual.updateSVG();
				$("#board").html(item);
			}() :
			console.log("figura n escolhida");
	},
	zoomMenos: function() {
		App.figuraAtual.viewBox ? function() {
			App.figuraAtual.viewBox.width += 100;
			var item = App.figuraAtual.updateSVG();
			$("#board").html(item);
		}() : 1;
	},

	controlaVertice: function(valor) {
		if (valor == "true") {
			$(".vertice").show();
		}
		else {
			$(".vertice").hide();
		}
	},
	fimSwipe:function(e){
		
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

	$("#swipeLog").append(JSON.stringify(App.const.traco));
	
		
		
	
	},
	startSwipe:function(e){
		console.log("[x:" + (e.pageX) + ", y:" + e.pageY + "]");
		App.const.traco.x1 = e.pageX || App.const.traco.x1;
		App.const.traco.y1 = e.pageY || App.const.traco.y1;
	//	$("#swipeLog").append("START\n");
		
	},
	updateSwipe:function(e){
		App.const.traco.x2 = e.pageX||App.const.traco.x2;
		App.const.traco.y2 = e.pageY||App.const.traco.y2;
	//	$("#swipeLog").append("UPDATE\n");
	
		var v1 = false;
		var v2 = false;
		for(var i = 0;i<App.figuraAtual.vertices.length;i++){
			if(!App.figuraAtual.vertices[i].hidden){
				v1 = App.figuraAtual.vertices[i];
				console.log(v1)
				break;
			}
		}
		
		for(var i = 0;i<App.figuraAtual.vertices.length;i++){
			var item = App.figuraAtual.vertices[i] 
			if((!item.hidden) && (item.id!=v1.id) && (getNosAdjacentes(v1.id,App.figuraAtual).indexOf(item.id)==-1)){
				v2 = App.figuraAtual.vertices[i];
				console.log(v2)
				break;
			}
		}
		
		
		if(v1 && v2){
			console.log("mostra")
		inserePontoMedio(v1.id, v2.id, App.figuraAtual);
		
			var item = App.figuraAtual.updateSVG();

			$("#board").html(item);
			
		}
	}
	,
	changeCheckExibeNumeros:function(evt){
		
		var checked =$(this).prop( "checked");
		App.config.exibeNumeros = checked;
		
		var item = App.figuraAtual.updateSVG();

			$("#board").html(item);
			$(".primeiro").attr("class", "vertice");
			$(".proibida").attr("class", "vertice");
	
	},
	changeCheckExibeVertices:function(evt){
		
		var checked =$(this).prop( "checked");
		App.config.exibeVertices = checked;
		if(App.config.exibeVertices){
			$(".vertice").show();
		}else{
			$(".vertice").hide();
		}
	}
};
