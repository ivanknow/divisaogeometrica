var App = App || {};
App.Figuras = {
	type: "",
	color: {},
	vertices: [],
	arestas: [],
	style: "",
	restos: [],
	restoCount: 0,
	viewBox: {
		minx: -100,
		miny: 20,
		width: 1000,
		height: 380
	},
	init: function(type) {
		this.restos = [];
		this.restoCount = 0;
		this.type = type;
		this.viewBox = {
			minx: -100,
			miny: 20,
			width: 1000,
			height: 380
		};
		switch (type) {
			case "triangulo":
				this.color = {
					r: 186,
					g: 0,
					b: 221
				};
				this.vertices = [{
					id: "v0",
					x: 0,
					y: 300,
					hidden: true
				}, {
					id: "v1",
					x: 300,
					y: 0
				}, {
					id: "v2",
					x: 600,
					y: 300,
					hidden: true
				}, {
					id: "v3",
					x: 300,
					y: 300
				}];
				this.arestas = [{
					vi: "v0",
					vf: "v1",
					d: 400
				}, {
					vi: "v1",
					vf: "v2",
					d: 400
				}, {
					vi: "v2",
					vf: "v3",
					d: 400
				}, {
					vi: "v3",
					vf: "v0",
					d: 400
				}];

				break;
			case "quadrado":

				this.color = {
					r: 255,
					g: 0,
					b: 255
				};
				this.vertices = [{
					id: "v0",
					x: 0,
					y: 0
				}, {
					id: "v1",
					x: 400,
					y: 0
				}, {
					id: "v2",
					x: 400,
					y: 400
				}, {
					id: "v3",
					x: 0,
					y: 400
				}];
				this.arestas = [{
					vi: "v0",
					vf: "v1",
					d: 400
				}, {
					vi: "v1",
					vf: "v2",
					d: 400
				}, {
					vi: "v2",
					vf: "v3",
					d: 400
				}, {
					vi: "v3",
					vf: "v0",
					d: 400
				}];

				break;
			case "losango":
				this.color = {
					r: 50,
					g: 205,
					b: 50
				};
				this.vertices = [{
					id: "v0",
					x: 220,
					y: 0
				}, {
					id: "v1",
					x: 440,
					y: 220
				}, {
					id: "v2",
					x: 220,
					y: 440
				}, {
					id: "v3",
					x: 0,
					y: 220
				}];

				this.arestas = [{
					vi: "v0",
					vf: "v1",
					d: 400
				}, {
					vi: "v1",
					vf: "v2",
					d: 400
				}, {
					vi: "v2",
					vf: "v3",
					d: 400
				}, {
					vi: "v3",
					vf: "v0",
					d: 400
				}];
				break;
			case "quadrado2":
			this.color = {
				r: 255,
				g: 0,
				b: 255
			};

					this.vertices = [{
						id: "v0",
						x: 0,
						y: 0
					}, {
						id: "v0m",
						x: 200,
						y: 0
					}, {
						id: "v1",
						x: 400,
						y: 0
					}, {
						id: "v1m",
						x: 400,
						y: 200
					}, {
						id: "v2",
						x: 400,
						y: 400
					}, {
						id: "v2m",
						x: 200,
						y: 400
					}, {
						id: "v3",
						x: 0,
						y: 400
					}, {
						id: "v3m",
						x: 0,
						y: 200
					}];
				this.arestas = [{
					vi: "v0",
					vf: "v0m",
					d: 0
				}, {
					vi: "v0m",
					vf: "v1",
					d: 0
				}, {
					vi: "v1",
					vf: "v1m",
					d: 400
				}, {
					vi: "v1m",
					vf: "v2",
					d: 400
				}, {
					vi: "v2",
					vf: "v2m",
					d: 400
				}, {
					vi: "v2m",
					vf: "v3",
					d: 400
				}, {
					vi: "v3",
					vf: "v3m",
					d: 400
				}, {
					vi: "v3m",
					vf: "v0",
					d: 400
				}];


				break;
		}
	},

	generateArestasVertices: function(content) {


		// gera arestas
		content += geraArestas(this);

		// gera vertices
		for (i = 0; i < this.vertices.length; i++) {
			content += geraVertice(this.vertices[i]);
		}

		return content;
	},
	wrapSVGTag: function(content) {
		var item = "<svg x='0' y='0' id='figurasvg' class='main figurasvg' viewBox='" + this.viewBox.minx + " " + this.viewBox.miny + " " + this.viewBox.width + " " + this.viewBox.height + "'>" + content +
			"</svg>";
		return item;
	},
	getSVG: function(elemento) {

		var content = this.generatePolygon();

		content += writeTextCentered(this.vertices, this.restos.length - 1);
		content += this.generateArestasVertices(content);

		return this.wrapSVGTag(content);
	},

	updateSVG: function() {
		var content = this.generatePolygonResto();
		content += this.generatePolygon();
		content += this.generateArestasVertices(content);
		content += writeTextCentered(this.vertices, this.restos.length - 1);

		return this.wrapSVGTag(content);
	},
	generatePolygon: function() {
		var points = "";

		for (i = 0; i < this.vertices.length; i++) {
			points += "" + this.vertices[i].x + "," + this.vertices[i].y + " ";
		}
		var style = "";
		if(this.restos.length == 0){
			style = "fill:rgb("+(this.color.r)+","+(this.color.g)+","+(this.color.b)+");";;
		}else{
			style = getColorCss(this.restos.length);
		}
		return "<polygon points='" + points + "' style='" + style + "' />";
	},
	generatePolygonResto: function() {
		var points = "";
		var content = "";
		for (i = 0; i < this.restos.length; i++) {
			for (var j = 0; j < this.restos[i].length; j++) {
				points += "" + this.restos[i][j].x + "," + this.restos[i][j].y + " ";
			}
			content += "<polygon points='" + points + "' style='" + getColorCss(i + 1) + "stroke:black;stroke-width:" + App.const.stroke + ";' />";
			content += writeTextCentered(this.restos[i], i);
			points = "";
		}
		//
		return content;
	}


};
