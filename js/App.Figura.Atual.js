/**
 * Object with values that is used for all aplication
 *
 * Dependences: Jquery, JqueryMobile
 */
var App = App || {};
App.figuraAtual = {
		style:"",
		vertices : [],
		arestas : [],
		restos:[],
		restoCount:0,
		setArestas:function(arestas){
			this.arestas = arestas;
		},
		setVertices:function(vertices){
			this.vertices = vertices;
		},
		generateArestasVertices : function(content) {


			// gera arestas
			content += geraArestas(this);

			// gera vertices
			for (i = 0; i < this.vertices.length; i++) {
				content += geraVertice(this.vertices[i]);
			}

			var item = "<svg   x='0' y='0' class='main figurasvg'>" + content
					+ "</svg>";
			return item;
		},
		getSVG : function(elemento) {

			var content = this.generatePolygon();

			return this.generateArestasVertices(content);
		},

		updateSVG : function() {
			var content = this.generatePolygonResto();
			content += this.generatePolygon();

			return this.generateArestasVertices(content);
		},
		generatePolygon:function(){
			var points = "";

			for (i = 0; i < this.vertices.length; i++) {
				points += ""+this.vertices[i].x+","+this.vertices[i].y+" ";
			}
			return "<polygon points='"+points+"' style='"+this.style+"' />";
		},
		generatePolygonResto:function(){
			var points = "";
			var content = "";
			for (i = 0; i < this.restos.length; i++) {
				for (var j = 0; j < this.restos[i].length; j++) {
					points += ""+this.restos[i][j].x+","+this.restos[i][j].y+" ";
				}
				content+="<polygon points='"+points+"' style='"+this.style+"stroke:gray;stroke-width:10;' />";
				points = "";
			}
			//
			return content;
		}
	};
