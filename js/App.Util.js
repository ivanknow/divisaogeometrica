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
}

function getPontoMedio(viid, vfid, figura){
   var vertice1 = getVerticeById(viid,figura);
   var vertice2 = getVerticeById(vfid,figura);
   
   var medio = {
			id :viid+"m"+vfid ,
			x : 0,
			y : 0
		};
		
		medio.x = (vertice1.x+vertice2.x)/2;
		medio.y = (vertice1.y+vertice2.y)/2;
		
		return medio;
}

function geraVertice(vertice){
   var content = "<circle id='"
						+ vertice.id
						+ "' cx='"
						+ vertice.x
						+ "' cy='"
						+ vertice.y
						+ "' r='9' fill='black' class='vertice' stroke-width='10'/>";
						
						return content;
}