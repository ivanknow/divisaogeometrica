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
		}, ]

	},

};