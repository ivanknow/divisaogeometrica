/**
 * Object with values that is used for all aplication
 *
 * Dependences: Jquery, JqueryMobile
 */

var App = App || {};
App.init = function() {// init
//salva margin do quadro


		$("#board").on("mouseover", ".vertice", function(evt) {

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
				App.const.mousePressed = false;//

				// TODO adiciona nova aresta a figura
				//App.addNovaAresta();

				// TODO inserir ponto medio
				var medio = getPontoMedio(id1, id2, App.figuraAtual);
				console.log(JSON.stringify(medio));
				App.figuraAtual.vertices.push(medio);
				App.figuraAtual.arestas.push({
					vi : id1,
					vf : id2,
					d : 0
				});

				var item = App.figuraAtual.updateSVG();

				$("#board").html(item);
				$(".primeiro").attr("class", "vertice");
				$(".proibida").attr("class", "vertice");
			}

		});

		$("#board").on(
				"click",
				".vertice",
				function(evt) {

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

					$("#board svg").append(newLine);
				});

		$("#board").on(
				"mousemove",
				".main",
				function(evt) {

					// console.log(App.mousePressed);

					if (App.const.mousePressed === true) {
						var topMargin =  $(".figurasvg").offset().top;
						var leftMargin = $(".figurasvg").offset().left;

						$("#linemoved")
						.attr("x2", evt.pageX - leftMargin - App.const.margin)
						.attr("y2",evt.pageY - topMargin - App.const.margin);
					}

				});

		$("#board").on("mousedown", ".main", function(evt) {

		});

		$("#board").on("mouseup", ".main", function(evt) {
			App.const.mousePressed = false;
			$(".primeiro").attr("class", "vertice");
			$(".proibida").attr("class", "vertice");
			$("#linemoved").remove();
		});

		$(".shape").click(function(evt) {
			var item = null;
			var tipo = $(this).attr("tipo");

			App.figuraAtual.style = $(this).attr("style");
			if (tipo == "quadrado") {
				App.figuraAtual.setVertices(clone(App.Figuras.quadrado.vertices));
				App.figuraAtual.setArestas(clone(App.Figuras.quadrado.arestas));
			}

			//var elemento = $(this);
			item = App.figuraAtual.getSVG();

			$("#board").html(item);

			$("#board  rect").attr("class", 'figura');
		});


	};



	$(document).on("pagebeforecreate", function(event) {
		App.init();
	});
