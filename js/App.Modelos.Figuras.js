var App = App || {};
App.Figuras = {
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

};
