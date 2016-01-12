var App = App || {};
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
		}
		],
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
		generateArestasVertices:function(content){
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

			var content = $("<svg   x='0' y='0' class='main figurinhas'/>")
					.append(elemento.clone()).html();
			
			return this.generateArestasVertices(content);
		},
		
		updateSVG:function(){
			
			var content = "";
	
			return this.generateArestasVertices(content);
		}

	},

};