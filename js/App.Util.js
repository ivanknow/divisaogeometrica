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

function geraArestas(figura) {
	var vi, vf, retorno = "";
	for (i = 0; i < figura.arestas.length; i++) {

		vi = getVerticeById(figura.arestas[i].vi, figura);

		vf = getVerticeById(figura.arestas[i].vf, figura);

		/*
		 * console.log("de " + figura.arestas[i].vi + " para " +
		 * figura.arestas[i].vf + "com " + figura.arestas[i].d); console.log("de (" +
		 * vi.x + "," + vi.y + ") para (" + vf.x + "," + vf.y + ")com " +
		 * figura.arestas[i].d);
		 */

		var newLine = geraLinha(vi.x, vi.y, vf.x, vf.y);
		var tmp = document.createElement("div");
		tmp.appendChild(newLine);
		// console.log(tmp.innerHTML);

		retorno += tmp.innerHTML;
	}

	return retorno;
}

function removeAresta(v1,v2,figura) {
	for(var i = 0;i<figura.arestas.length;i++){
		if(figura.arestas[i].vi === v1 && figura.arestas[i].vf === v2 ){
			figura.arestas.splice(i, 1);
		}
		if(figura.arestas[i].vf === v1 && figura.arestas[i].vi === v2 ){
			figura.arestas.splice(i, 1);
		}
	}
}

function removeVertice(v,figura) {
	for(var i = 0;i<figura.vertices.length;i++){
			if(figura.vertices[i].id === v){
				figura.vertices.splice(i, 1);
				console.log("remove "+ v);
			}
		}
	for(var j = 0;j<figura.arestas.length;j++){

		if(figura.arestas[j].vf == v || figura.arestas[j].vi == v ){
			console.log("remove aresta");
			figura.arestas.splice(j, 1);
		}
	}
}

function getPontoMedio(viid, vfid, figura) {
	var vertice1 = getVerticeById(viid, figura);
	var vertice2 = getVerticeById(vfid, figura);

	var medio = {
		id : viid + "m" + vfid,
		x : 0,
		y : 0
	};

	medio.x = (vertice1.x + vertice2.x) / 2;
	medio.y = (vertice1.y + vertice2.y) / 2;

	return medio;
}

function geraVertice(vertice) {
	var content = "<circle id='" + vertice.id + "' cx='" + vertice.x + "' cy='"
			+ vertice.y
			+ "' r='13' fill='black' class='vertice' stroke-width='10'/>";

	return content;
}

function isAdjacente(viid, vfid, figura) {
	var vertice1 = getVerticeById(viid, figura);
	var vertice2 = getVerticeById(vfid, figura);
	for (var i = 0; i < figura.arestas.length; i++) {
		if (figura.arestas.vi == vertice1.id
				&& figura.arestas.vf == vertice2.id) {
			return true;
		}

		if (figura.arestas.vi == vertice2.id
				&& figura.arestas.vf == vertice1.id) {
			return true;
		}
	}

	return false;

}

function getNosAdjacentes(v, figura) {
	var vertice = getVerticeById(v, figura);
	console.log(vertice);
	var adjacentes = new Array();
	for (var i = 0; i < figura.arestas.length; i++) {

		if (figura.arestas[i].vi == vertice.id) {
			adjacentes.push(figura.arestas[i].vf);
		} else {
			if (figura.arestas[i].vf == vertice.id) {
				adjacentes.push(figura.arestas[i].vi);
			}
		}

	}

	return adjacentes;

}

function getProibidas(v, figura) {
	var vertice = getVerticeById(v, figura);

	var proibidas = new Array();
	proibidas = (getNosAdjacentes(v, figura));

	return proibidas;

}

function getCaminho(vi, vf, figura, caminho) {

	console.log("passou"+vi+"-"+vf);
	console.log(caminho);
	if(caminho === null){
		caminho = new Array();
	}
	if(vi === vf){
		return null;
	}

	var aresta = null;
	for (var i = 0; i < figura.arestas.length; i++) {
		if(vi === figura.arestas[i].vi){
			aresta = figura.arestas[i];
		}
	}

	if(caminho.indexOf(vi)!= -1){
		//significa que tem um vi, ou seja loop
		caminho.push(vi);
		return null;
	}
	caminho.push(vi);
	console.log(caminho);
	if(aresta === null){
		return null;
	}

	if(vf === aresta.vf){
		caminho.push(vf);

	}else{
		var vx = aresta.vf;
		getCaminho(vx, vf, figura, caminho);
	}

	return caminho;


}

function removeVerticesOutOfThePath(vi, vf, figura){
	var newPath = getPath(vi, vf, figura);
	for(var i = 0;i<figura.vertices.length;i++){
			if(newPath.indexOf(figura.vertices[i].id)===-1 ){
				removeVertice(figura.vertices[i].id,figura);
			}
		}

}

function getPath(vi, vf, figura) {

	if(vi === vf){
			return [];
	}else{

				for (var i = 0; i < figura.arestas.length; i++) {

						if(figura.arestas[i].vi === vi){
								if(figura.arestas[i].vf === vf){

								return [vi,vf];
						}else{
							var r = getPath(figura.arestas[i].vf,vf,figura);
							return r.indexOf(v1) != -1?[]:[vi].concat(r);
						}
					}
			}

			return [];

	}

}

function dividirFigura(vi, vf, figura) {
	// pega os adjacentes de vi
	var adj = getNosAdjacentes(vi, figura);
	// pega um caminho de vi ate vf
	var caminho = getCaminho(vi, vf, figura, null);
	if(caminho == null){
		return null;
	}
	// o caminho que tiver
	//sempre vao sr so duas adjacencias pq eu vou dividir
	var adjEscolida = "";
	if(caminho.indexOf(adj[0]) != -1){
		//usa a 0
		adjEscolida = adj[0];
	}else{
		//usa a 1
		adjEscolida = adj[1];
	}




}

function distanciaDoisPontos(v1, v2, figura) {
	var vi = getVerticeById(v1, figura);
	console.log(vi);
	var vf = getVerticeById(v2, figura);
	console.log(vf);
	return Math.sqrt(Math.pow(vf.x - vi.x, 2) + Math.pow(vf.y - vi.y, 2));
}

function clone(obj) {
	var copy;

	// Handle the 3 simple types, and null or undefined
	if (null == obj || "object" != typeof obj)
		return obj;

	// Handle Date
	if (obj instanceof Date) {
		copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}

	// Handle Array
	if (obj instanceof Array) {
		copy = [];
		for (var i = 0, len = obj.length; i < len; i++) {
			copy[i] = clone(obj[i]);
		}
		return copy;
	}

	// Handle Object
	if (obj instanceof Object) {
		copy = {};
		for ( var attr in obj) {
			if (obj.hasOwnProperty(attr))
				copy[attr] = clone(obj[attr]);
		}
		return copy;
	}

	throw new Error("Unable to copy obj! Its type isn't supported.");
}
