/**
 * Object with values that is used for all aplication
 * 
 * Dependences: Jquery, JqueryMobile
 */
var App = App || {};
App = {
	figuraAtual : {
		style:"",
		vertices : [],
		arestas : [],
		setArestas:function(arestas){
			this.arestas = arestas;
		},
		setVertices:function(vertices){
			this.vertices = vertices;
		},
		generateArestasVertices : function(content) {
			// gera vertices
			for (i = 0; i < this.vertices.length; i++) {
				content += geraVertice(this.vertices[i]);
			}

			// gera arestas
			content += geraArestas(this);

			var item = "<svg   x='0' y='0' class='main figurasvg'>" + content
					+ "</svg>";
			return item;
		},
		getSVG : function(elemento) {

			var content = this.generatePolygon();

			return this.generateArestasVertices(content);
		},

		updateSVG : function() {

			var content = this.generatePolygon();
			
			return this.generateArestasVertices(content);
		},
		generatePolygon:function(){
			var points = "";
			
			for (i = 0; i < this.vertices.length; i++) {
				points += ""+this.vertices[i].x+","+this.vertices[i].y+" ";
			}
			return "<polygon points='"+points+"' style='"+this.style+"' />";
		}
	},
	mousePressed : false,
	viid : "",
	vfid : "",
	verticePressedX : 0,
	verticePressedY : 0,
	addNovaAresta : function(viid, vfid) {
		// TODO
	}
};

