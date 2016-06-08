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

		//legado
				var p = $(this);

 				var newLine = geraLinha($(this).attr("cx"),
 						$(this).attr("cy"), $(this).attr("cx"),
 						$(this).attr("cy"));
 				newLine.setAttribute('id', 'linemoved');
 				newLine.setAttribute("stroke-dasharray","20,20");

 				$("#board svg").append(newLine);

//legado

	},
	onMouseOverVerticeFindSecond:function(evt){

		var hasClass = $(this).attr("class");
		if (hasClass != "primeiro vertice" && hasClass != "proibida vertice" && App.const.mousePressed) {
			// se nao for o primeiro ou proibida ele termina

			var id1 = $(".primeiro").attr("id");
			var id2 = $(this).attr("id");

			//legado
			var p = $(this);
  			var position = p.position();
  			var topMargin = $(".figurasvg").offset().top;
  			var leftMargin = $(".figurasvg").offset().left;
  			$("#linemoved").attr("x2", position.left - topMargin - App.const.margin);
  			$("#linemoved").attr("y2", position.top - leftMargin - App.const.margin);
  			$("#linemoved").removeAttr("id");

  			//legado


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

		App.figuraAtual = Object.create(App.Figuras);
		App.figuraAtual.init(tipo);

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
	},
	zoomMais:function(){
		App.figuraAtual.viewBox?function(){
			App.figuraAtual.viewBox.width -= 100;
			var item = App.figuraAtual.updateSVG();
			$("#board").html(item); }()
			:console.log("figura n escolhida");
	},
	zoomMenos:function(){
		App.figuraAtual.viewBox?function(){
			App.figuraAtual.viewBox.width += 100;
			var item = App.figuraAtual.updateSVG();
			$("#board").html(item);
		}():1;
	},

	controlaVertice:function(valor){
	if(valor == "true"){
		$(".vertice").show();
	}else{
		$(".vertice").hide();
	}
	},
	divisaoSwipe:function(evt){
		var coords = {};
		if(evt.swipestart){
			var coords = evt.swipestart.coords;
		}else{
			var coords = [];
		}
		$("#board").append("Swipe detected!"+JSON.stringify(coords));
	},
	
	onSwiteVerticeSelectFirst:function(evt){
 				var newLine = geraLinha(0,0,evt.pageX ,evt.pageY);
 				newLine.setAttribute('id', 'linemoved');
 				newLine.setAttribute("stroke-dasharray","20,20");

 				$("#board svg").append(newLine);

//legado

	},
	onSwipeOverVerticeFindSecond:function(evt){
	
  			var topMargin = $(".figurasvg").offset().top;
  			var leftMargin = $(".figurasvg").offset().left;
  			$("#linemoved").attr("x2", evt.pageX);
  			$("#linemoved").attr("y2", evt.pageY);
  			

		}

	,
};
