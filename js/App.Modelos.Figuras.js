var App = App || {};
App.Figuras = {
	triangulo : {
		vertices : [ {
			id : "v0",
			x : 0,
			y : 400
		}, {
			id : "v1",
			x : 200,
			y : 0
		}, {
			id : "v2",
			x : 400,
			y : 400
		}
		],
		arestas : [ {
			vi : "v0",
			vf : "v1",
			d : 400
		}, {
			vi : "v1",
			vf : "v2",
			d : 400
		}, {
			vi : "v2",
			vf : "v0",
			d : 400
		} ]

	},
	quadrado : {
		vertices : [ {
			id : "v0",
			x : 0,
			y : 0
		}, {
			id : "v1",
			x : 400,
			y : 0
		}, {
			id : "v2",
			x : 400,
			y : 400
		}, {
			id : "v3",
			x : 0,
			y : 400
		}
		],
		arestas : [ {
			vi : "v0",
			vf : "v1",
			d : 400
		}, {
			vi : "v1",
			vf : "v2",
			d : 400
		}, {
			vi : "v2",
			vf : "v3",
			d : 400
		}, {
			vi : "v3",
			vf : "v0",
			d : 400
		}, ]

	},
	quadrado2 : {
		vertices : [ {
			id : "v0",
			x : 200,
			y : 0
		}, {
			id : "v1",
			x : 400,
			y : 200
		}, {
			id : "v2",
			x : 200,
			y : 400
		}, {
			id : "v3",
			x : 0,
			y : 200
		}
		],
		arestas : [ {
			vi : "v0",
			vf : "v1",
			d : 400
		}, {
			vi : "v1",
			vf : "v2",
			d : 400
		}, {
			vi : "v2",
			vf : "v3",
			d : 400
		}, {
			vi : "v3",
			vf : "v0",
			d : 400
		}, ]

	},
	pentagono : {
		vertices : [ {
			id : "v0",
			x : 400,
			y : 132
		}, {
			id : "v1",
			x : 200,
			y : 0
		}, {
			id : "v2",
			x : 0,
			y : 132
		}, {
			id : "v3",
			x : 66,
			y : 400
		},{
		 id : "v4",
		 x : 344,
		 y : 400
	 }
		],
		arestas : [ {
			vi : "v0",
			vf : "v1",
			d : 400
		}, {
			vi : "v1",
			vf : "v2",
			d : 400
		}, {
			vi : "v2",
			vf : "v3",
			d : 400
		}, {
			vi : "v3",
			vf : "v4",
			d : 400
		},{
			vi : "v4",
			vf : "v0",
			d : 400
		}, ]

	},

};
