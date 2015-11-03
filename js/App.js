/**
 * Object with values that is used for all aplication
 * 
 * Dependences: Jquery, JqueryMobile
 */
 
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
function geraArestas(figura) {
	var vi, vf, retorno = "";
	for (i = 0; i < figura.arestas.length; i++) {

		vi = getVerticeById(figura.arestas[i].vi, figura);

		vf = getVerticeById(figura.arestas[i].vf, figura);

		console.log("de " + figura.arestas[i].vi + " para "
				+ figura.arestas[i].vf + "com " + figura.arestas[i].d);
		console.log("de (" + vi.x + "," + vi.y + ") para (" + vf.x + "," + vf.y
				+ ")com " + figura.arestas[i].d);

		var newLine = geraLinha(vi.x, vi.y, vf.x, vf.y);
		var tmp = document.createElement("div");
		tmp.appendChild(newLine);
		console.log(tmp.innerHTML);

		retorno += tmp.innerHTML;
	}

	return retorno;
};

function geraLinha(x1, y1, x2, y2) {
	var newLine = document
			.createElementNS('http://www.w3.org/2000/svg', 'line');
	newLine.setAttribute('class', 'line');
	// newLine.setAttribute('id','linemoved');
	newLine.setAttribute('x1', x1);
	newLine.setAttribute('y1', y1);
	newLine.setAttribute('x2', x2);
	newLine.setAttribute('y2', y2);
	return newLine;
}

function getVerticeById(verticeId, figura) {
	for (j = 0; j < figura.vertices.length; j++) {
		if (figura.vertices[j].id == verticeId) {
			vi = figura.vertices[j];
			return vi;
		}
	}
}

function contemAresta(vi, vf, figura) {
	for (i = 0; i < figura.arestas.length; i++) {
		if ((figura.arestas[i].vi == vi && figura.arestas[i].vf == vf)
				|| (figura.arestas.vi[i] == vf && figura.arestas.vf[i] == vi)) {
			return figura.arestas[i]
		} else {
			return false;
		}
	}
}

App.Figuras = {
	quadrado : {
		vertices : [ {
			id : "v0",
			x : 10,
			y : 10
		}, {
			id : "v1",
			x : 410,
			y : 10
		}, {
			id : "v2",
			x : 410,
			y : 410
		}, {
			id : "v3",
			x : 10,
			y : 410
		} ],
		arestas : [ {
			vi : "v0",
			vf : "v1",
			d : 410
		}, {
			vi : "v1",
			vf : "v2",
			d : 410
		}, {
			vi : "v2",
			vf : "v3",
			d : 410
		}, {
			vi : "v3",
			vf : "v0",
			d : 410
		}, ],

		getSVG : function(elemento) {

			var content = $("<svg   x='0' y='0' class='main figurinhas'/>")
					.append(elemento.clone()).html();
			// gera vertices
			for (i = 0; i < this.vertices.length; i++) {
				content += "<circle id='"
						+ this.vertices[i].id
						+ "' cx='"
						+ this.vertices[i].x
						+ "' cy='"
						+ this.vertices[i].y
						+ "' r='9' fill='black' class='vertice' stroke-width='10'/>";
			}

			// gera arestas
			content += geraArestas(this);

			var item = "<svg   x='0' y='0' class='main figurasvg'>" + content
					+ "</svg>";
			return item;
		},

	},

};

$(document).on("pagebeforecreate", function(event) {
	App.init();
});
