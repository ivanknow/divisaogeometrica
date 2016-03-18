/**
 * Object with values that is used for all aplication
 *
 * Dependences: Jquery, JqueryMobile
 */

var App = App || {};

App.events =  {
	onClickVerticeSelectFirst:function(evt){
		App.const.mousePressed = true;

		$(this).attr("class", "primeiro vertice");

		var vid = $(this).attr("id");

		var priibidas = getProibidas(vid,App.figuraAtual);
		for(var i=0;i<priibidas.length;i++){
			$("#"+priibidas[i]).attr("class", "proibida vertice");
		}

		var p = $(this);

		var newLine = geraLinha($(this).attr("cx"),
				$(this).attr("cy"), $(this).attr("cx"),
				$(this).attr("cy"));
		newLine.setAttribute('id', 'linemoved');
		newLine.setAttribute("stroke-dasharray","10,10");

		$("#board svg").append(newLine);
	},
	onMouseOverVerticeFindSecond:function(evt){
		var hasClass = $(this).attr("class");

		if (hasClass != "primeiro vertice" && hasClass != "proibida vertice" && App.const.mousePressed) {
			// se nao for o primeiro ou proibida ele termina

			var id1 = $(".primeiro").attr("id");
			var id2 = $(this).attr("id");

			var p = $(this);
			var position = p.position();
			var topMargin = $(".figurasvg").offset().top;
			var leftMargin = $(".figurasvg").offset().left;
			$("#linemoved").attr("x2", position.left - topMargin - App.const.margin);
			$("#linemoved").attr("y2", position.top - leftMargin - App.const.margin);

			$("#linemoved").removeAttr("id");// remove a propriedade
			// de se mover
			App.const.mousePressed = false;


			//inserir ponto medio
			inserePontoMedio(id1,id2,App.figuraAtual);

			var item = App.figuraAtual.updateSVG();

			$("#board").html(item);
			$(".primeiro").attr("class", "vertice");
			$(".proibida").attr("class", "vertice");
		}

	},
	onClickShapeSelectShape:function(evt){
		var item = null;
		var tipo = $(this).attr("tipo");

		App.figuraAtual.style = $(this).attr("style");
		App.figuraAtual.tipo = tipo;
		if (tipo == "quadrado") {
			App.figuraAtual.setVertices(clone(App.Figuras.quadrado.vertices));
			App.figuraAtual.setArestas(clone(App.Figuras.quadrado.arestas));
		}
		if (tipo == "quadrado2") {
			App.figuraAtual.setVertices(clone(App.Figuras.quadrado2.vertices));
			App.figuraAtual.setArestas(clone(App.Figuras.quadrado2.arestas));
		}
		if (tipo == "triangulo") {
			App.figuraAtual.setVertices(clone(App.Figuras.triangulo.vertices));
			App.figuraAtual.setArestas(clone(App.Figuras.triangulo.arestas));
		}
		if (tipo == "pentagono") {
			App.figuraAtual.setVertices(clone(App.Figuras.pentagono.vertices));
			App.figuraAtual.setArestas(clone(App.Figuras.pentagono.arestas));
		}

		//var elemento = $(this);
		item = App.figuraAtual.getSVG();

		$("#board").html(item);

		$("#board  rect").attr("class", 'figura');

	},
	onMouseUpRemovePrimeiro:function(evt){
		App.const.mousePressed = false;
		$(".primeiro").attr("class", "vertice");
		$(".proibida").attr("class", "vertice");
		$("#linemoved").remove();
	},
	onMouseMoveOnMainSVG:function(evt){
		if (App.const.mousePressed === true) {
			var topMargin =  $(".figurasvg").offset().top;
			var leftMargin = $(".figurasvg").offset().left;

			$("#linemoved")
			.attr("x2", evt.pageX - leftMargin - App.const.margin)
			.attr("y2",evt.pageY - topMargin - App.const.margin);
		}
	}

};