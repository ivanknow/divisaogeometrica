/**
 * Object with values that is used for all aplication
 * 
 * Dependences: Jquery, JqueryMobile
 */
var App = App || {};
App = {	figuraAtual : null,
	mousePressed : false,
	viid : "",
	vfid : "",
	verticePressedX : 0,
	verticePressedY : 0,
	addNovaAresta : function(viid, vfid) {

	},
	init : function() {// init
		$("#board").on("mouseover", ".vertice", function(evt) {
			var hasClass = $(this).attr("class");

			if (hasClass != "primeiro vertice") { // se n for o primeiro ele
													// termina
				var p = $(this);
				var position = p.position();

				$("#linemoved").attr("x2", position.left - 8);
				$("#linemoved").attr("y2", position.top - 52);

				$("#linemoved").attr("id", "elemento");// remove a propriedade
														// de se mover
				App.mousePressed = false;//

				// TODO adiciona nova aresta a figura
				App.addNovaAresta();

			}
			$(".primeiro").attr("class", "vertice");

		});

		$("#board").on(
				"click",
				".vertice",
				function(evt) {

					App.mousePressed = true;

					$(this).attr("class", "primeiro vertice");

					var p = $(this);
					var position = p.position();

					App.verticePressedX = position.left;
					App.verticePressedY = position.top;

					var newLine = geraLinha(position.left - 8,
							position.top - 52, position.left - 8,
							position.top - 52);
					newLine.setAttribute('id', 'linemoved');

					$("#board svg").append(newLine);
				});
		$("#board").on(
				"mousemove",
				".main",
				function(evt) {
					console.log(App.mousePressed);
					if (App.mousePressed === true) {

						$("#linemoved").attr("x2", evt.pageX - 8).attr("y2",
								evt.pageY - 52);
					}

				});

		$("#board").on("mousedown", ".main", function(evt) {

		});

		$("#board").on("mouseup", ".main", function(evt) {
			App.mousePressed = false;

			$("#linemoved").remove();
		});

		$(".shape").click(function(evt) {
			var item = null;
			var tipo = $(this).attr("tipo");
			if (tipo == "quadrado") {
				App.figuraAtual = App.Figuras.quadrado;
			}
			
			var elemento = $(this);
			item = App.figuraAtual.getSVG(elemento);

			$("#board").html(item);

			$("#board  rect").attr("class", 'figura');
		});

	}// fim init

};

$(document).on("pagebeforecreate", function(event) {
	App.init();
});
