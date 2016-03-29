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
		if((figura.arestas[i].vi === v1 && figura.arestas[i].vf === v2 )||(figura.arestas[i].vf === v1 && figura.arestas[i].vi === v2 )){
			figura.arestas.splice(i, 1);
		}
	}
}

function removeVertice(v,figura) {
	for(var i = figura.vertices.length-1;i>=0;i--){
			if(figura.vertices[i].id === v){

				addPontoResto(figura,figura.vertices[i]);

				figura.vertices.splice(i, 1);
			}
		}

	for(var j = figura.arestas.length -1 ;j>=0;j--){
	if(figura.arestas[j].vf === v || figura.arestas[j].vi === v ){
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
			+ "' r='40' fill='green' class='vertice alvo' stroke-width='"+App.const.stroke+"'/>";

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
	//TODO add colineares
	return proibidas;

}

function removeVerticesOutOfThePath(vi, vf, figura){
	var newPath = getPath(vi, vf, figura);
	for(var i = figura.vertices.length-1;i>=0;i--){
			if(newPath.indexOf(figura.vertices[i].id)===-1 ){
			//	console.log(figura.vertices[i].id);
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
							return r.indexOf(vi) != -1?[]:[vi].concat(r);
						}
					}
			}

			return [];

	}

}


function distanciaDoisPontos(v1, v2, figura) {
	var vi = getVerticeById(v1, figura);
//	console.log(vi);
	var vf = getVerticeById(v2, figura);
	//console.log(vf);
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

function inserePontoMedio(id1,id2,figura){

	if(getVerticeIndex(id1,figura)>getVerticeIndex(id2,figura)){
		var temp = id1;
		id1 = id2;
		id2 = temp;
	}

	addPontoResto(figura,getVerticeById(id1,figura));
	addPontoResto(figura,getVerticeById(id2,figura));

	var medio = getPontoMedio(id1, id2,figura);

	//figura.vertices.push(medio);
	var nextIndex = getVerticeIndex(id1,figura);
	figura.vertices.splice(nextIndex+1,0,medio);
	figura.arestas.push({
		vi : id1,
		vf : medio.id,
		d : 0
	},{
		vi : medio.id,
		vf : id2,
		d : 0
	});

removeVerticesOutOfThePath(medio.id,id1,figura);
figura.restoCount++;
}

function getVerticeIndex(verticeId,figura){

	for(var i=0;i<figura.vertices.length;i++){
		if(figura.vertices[i].id===verticeId){
			break;
		}
	}
	return i;
}

function addPontoResto(figura,vertice){
	//console.log(JSON.stringify(figura));
	var ponto = {"x":vertice.x,"y":vertice.y};
	figura.restos[figura.restoCount] = figura.restos[figura.restoCount]||[];
	figura.restos[figura.restoCount].push(ponto);
}

function getColorCss(time) {
var colors = [
	{r:25,g:25,b:112},
	{r:139,g:0,b:139},
	{r:255,g:69,b:0},
	{r:0,g:255,b:127},
	{r:255,g:0,b:0},
	{r:50,g:205,b:50},
	{r:139,g:0,b:0}
];

var color = colors[time%7];

return "fill:rgb("+(color.r)+","+(color.g)+","+(color.b)+");";
}

function getFiguraCenter(vertices){

	var center = {x:0,y:0};
	for(var i=0;i<vertices.length;i++){
		center.x += vertices[i].x;
		center.y += vertices[i].y;
	}
	center.x = center.x/vertices.length;
	center.y = center.y/vertices.length;

	return center;
}

function writeTextCentered(points,time){
	var center = getFiguraCenter(points);
	return "<text class='noselect' font-size='"+(50-(time*8))+"'  style='fill:#000;' x='"+(center.x-33)+"' y='"+(center.y+20)+"'>"+1+"/"+Math.pow(2,time+1)+"</text>";

}
