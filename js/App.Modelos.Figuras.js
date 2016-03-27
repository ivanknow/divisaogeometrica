var App = App || {};
App.Figuras = {
	type:"",
	color:{},
	vertices : [],
	arestas : [],
	style:"",
	restos:[],
	restoCount:0,
	init:function(type){
		this.restos = [];
		this.restoCount = 0;
		this.type = type;
		switch (type) {
		case "triangulo":
		this.color = {r:255,g:128,b:0};
		this.vertices = [
			{id:"v0",x:0,y:400},
		 	{id:"v1",x:200,y : 200},
			{id : "v2",	x : 400,y : 400},
			{id : "v3",	x : 200,y : 400}
		];
		this.arestas = 	[
			{vi : "v0",	vf : "v1",	d : 400	},
			{	vi : "v1",vf : "v2",d : 400},
			{	vi : "v2",	vf : "v3",d : 400	},
			{	vi : "v3",	vf : "v0",d : 400	}
		];

		break;
		case "quadrado":

		this.color={r:0,g:0,b:128};
		this.vertices=[
		{id : "v0",x : 0,y : 0},
		{id : "v1",x : 400,	y : 0},
		{id : "v2",x : 400,y : 400},
		{id : "v3",x : 0,y : 400}
		];
		this.arestas = [
		{	vi : "v0",vf : "v1",d : 400},
		{vi : "v1",vf : "v2",d : 400},
		{vi : "v2",vf : "v3",d : 400},
		{vi : "v3",vf : "v0",d : 400}
		];

		break;
		case "losango":
		this.color = {r:255,g:0,b:0		};
		this.vertices = [
			{id : "v0",x : 200,y : 0		},
			{id : "v1",x : 400,y : 200		},
			{id : "v2",x : 200,y : 400		},
			 {id : "v3",x : 0,y : 200		}
	];

		this.arestas = [
			{vi : "v0",vf : "v1",d : 400		},
			{vi : "v1",vf : "v2",d : 400		},
			{vi : "v2",vf : "v3",d : 400		},
			{vi : "v3",vf : "v0",d : 400		}
			 ];
break;
		case "quadrado2":
		this.color={r:0,g:128,b:0		},

		this.vertices=[
		{id : "v0",x : 0,y : 0},
		{id : "v0m",x : 200,y : 0},
		{id : "v1",x : 400,	y : 0},
		{id : "v1m",x : 400,	y : 200},
		{id : "v2",x : 400,y : 400},
		{id : "v2m",x : 200,y : 400},
		{id : "v3",x : 0,y : 400},
		{id : "v3m",x : 0,y : 200}
		];
		this.arestas = [
		{	vi : "v0",vf : "v0m",d : 0},
		{	vi : "v0m",vf : "v1",d : 0},
		{vi : "v1",vf : "v1m",d : 400},
		{vi : "v1m",vf : "v2",d : 400},
		{vi : "v2",vf : "v2m",d : 400},
		{vi : "v2m",vf : "v3",d : 400},
		{vi : "v3",vf : "v3m",d : 400},
		{vi : "v3m",vf : "v0",d : 400}
		];


		break;
		}
	},

	generateArestasVertices : function(content) {


		// gera arestas
		content += geraArestas(this);

		// gera vertices
		for (i = 0; i < this.vertices.length; i++) {
			content += geraVertice(this.vertices[i]);
		}

		return content;
	},
	wrapSVGTag:function(content){
		var item = "<svg x='0' y='0' class='main figurasvg'>" + content
				+ "</svg>";
		return item;
	},
	getSVG : function(elemento) {

		var content = this.generatePolygon();

		content+=writeTextCentered(this.vertices,this.restos.length-1);
		content+= this.generateArestasVertices(content);

		return this.wrapSVGTag(content);
	},

	updateSVG : function() {
		var content = this.generatePolygonResto();
		content += this.generatePolygon();
		content+= this.generateArestasVertices(content);
		content+=writeTextCentered(this.vertices,this.restos.length-1);

		return this.wrapSVGTag(content);
	},
	generatePolygon:function(){
		var points = "";

		for (i = 0; i < this.vertices.length; i++) {
			points += ""+this.vertices[i].x+","+this.vertices[i].y+" ";
		}
		return "<polygon points='"+points+"' style='"+getColorCss(this.restos.length)+"' />";
	},
	generatePolygonResto:function(){
		var points = "";
		var content = "";
		for (i = 0; i < this.restos.length; i++) {
			for (var j = 0; j < this.restos[i].length; j++) {
				points += ""+this.restos[i][j].x+","+this.restos[i][j].y+" ";
			}
			content+="<polygon points='"+points+"' style='"+getColorCss(i+1)+"stroke:black;stroke-width:"+App.const.stroke+";' />";
			content+=writeTextCentered(this.restos[i],i);
			points = "";
		}
		//
		return content;
	}


};
