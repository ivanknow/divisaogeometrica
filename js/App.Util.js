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

function getProibidas(v, figura) {
	var vertice = getVerticeById(v, figura);
	console.log(vertice);
	var proibidas = new Array();
	for (var i = 0; i < figura.arestas.length; i++) {
		
		if (figura.arestas[i].vi == vertice.id) {
			proibidas.push(figura.arestas[i].vf);
		} else {
			if (figura.arestas[i].vf == vertice.id) {
				proibidas.push(figura.arestas[i].vi);
			}
		}

	}
	
	return proibidas;

}

function dividirFigura(vi,vf,figura){
	
}

function distanciaDoisPontos(v1,v2,figura){
	var vi = getVerticeById(v1,figura);
	console.log(vi);
	var vf = getVerticeById(v2,figura);
	console.log(vf);
	return Math.sqrt(Math.pow(vf.x - vi.x,2)+Math.pow(vf.y - vi.y,2)); 
}

function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

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
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}