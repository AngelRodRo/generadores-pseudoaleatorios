$(function(){

	$("#prueba_medias").click(function(){

		var R = $("#R").val().split("\n");
		var Zalphamedios = $("#Zalphamedios").val();
		Zalphamedios = parseFloat(Zalphamedios);
		var n = R.length;
		var S = 0;


		for (var i = 0; i <n; i++) {
			S=+ parseFloat(R[i]);
		};

		var prom = S/n;

		var LI = 1/2-Zalphamedios*(1/Math.pow(12*n,1/2));
		var LS = 1/2+Zalphamedios*(1/Math.pow(12*n,1/2));


		if(LI<prom<LS)
			alert('No se puede rechazar que el conjunto Ri tiene un valor esperado de 0.5 con un nivel de aceptacion de 95%');
		else
			alert('Se rechaza que el conjunto R tiene un valor esperado de 0.5');


	});

	$("#prueba_varianza").click(function(){
		
		var R = $("#R").val().split("\n");
		var Xalphamediosnmenos1 = $("#Xalphamediosnmenos1").val();
		var X1menosalphamediosnmenos1 = $("#X1menosalphamediosnmenos1").val();

		var n = R.length;
		var S = 0;
		var SV = 0;
		var V = 0;

		for (var i = 0; i <n; i++) {
			S=+ parseFloat(R[i]);
		};

		var prom = S/n;

		for (var i = 0; i <n; i++) {
			SV += R[i]-prom;
		};

		V = SV/n-1;

		LS = Xalphamediosnmenos1/12*(n-1);

		LI = X1menosalphamediosnmenos1/12*(n-1);

		if(LI<V<LS)
			alert('No se puede rechazar que el conjunto R tiene una varianza de 1/12 con un nivel de aceptacion ')
		else
			alert('Se rechaza que el conjunto R tiene una varianza de 1/12');

	});

	$("#pruebachicuadrado").click(function(){
		var R = $("#R").val().split("\n");
		var est = $("#valor_estadistico").val();

		pruebachicuadrado(R,est);

	});

	$("#KS").click(function(){
		var R = $("#R").val().split("\n");
		var est = $("#valor_estadistico").val();

		KS(R,est);

	});

});

function deMenorAMayor(elem1, elem2) {return elem1-elem2;}

function pruebachicuadrado(na,est){

	var n = na.length;	
	var inv = [];
	var m = Math.sqrt(n,1/2);
	var m = parseInt(m);

	var O = [];
	var E = [];

	var val = 1/m;
	var init = 0;

	var _x = 0;

	for (var i = 1; i <= m; i++) {
		O[i]=0;
		E[i]= n/m;
	};


	for (var i = 1; i <= m; i++) {

		inv[i]=new Array();

		inv[i][0] = init;
		inv[i][1] = init + val;

		init = inv[i][1];		

		for (var j = 0; j < na.length; j++) {
			if(inv[i][0]<=na[j]&&na[j]<inv[i][1]){
				O[i]+=1;
			}

		};


	};

	for (var i = 1; i <= m; i++) {
		var a = E[i]-O[i];
		var b = E[i];

		_x = _x + Math.pow(a,2)/b;
	};

	if(_x<est){
		alert('No se puede rechazar que los numeros sigues una distribucion uniforme');
	}
	else
		alert('Se rechaza los numeros porque no siguen una distribucion uniforme');



}

function KS(na,est){
	
	var n = na.length;

	na.sort(deMenorAMayor);
	var idivn = [];
	var iminus1divn=[];
	var iminus1divminusr1=[];
	var _r = [];
	var Dplus;
	var Dminus;
	var D;

	for (var i = 0; i < n; i++) {
		idivn[i] = (i+1)/n;
		iminus1divn[i]=(i)/n;
		iminus1divminusr1[i] = (i+1)/n - na[i];
		_r[i] = na[i]-(i)/n;
	};

	Dplus = numMayor(_r);
	Dminus = numMayor(iminus1divminusr1);

	D = numMayor([Dplus,Dminus]);


	if(D<est){
		alert('Los numeros estan distribuidos uniformemente');
	}
	else
		alert('Los numeros no estan distribuidos uniformemente');

}


function numMayor(items){

	var max = 0;
	var n = items.length;

	for (var i = 0; i < n; i++) {
		if(max<items[i])
			max= items[i];
	};

	return max;

}



