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

		pruebachicuadrado(R);

	});

	$("#KS").click(function(){
		var R = $("#R").val().split("\n");

		KS(R);

	});

	$("#pruebaArribaAbajo").click(function(){
		var R = $("#R").val().split("\n");
		pruebas_corrida_arriba_abajo(R);
	});

	$("#pruebaArribaAbajoMedia").click(function(){
		var R = $("#R").val().split("\n");
		pruebas_corrida_arriba_abajo_media(R);
	});

	$("#pruebapoker").click(function(){
		var R = $("#R").val().split("\n");
		prueba_poker(R);

	});

	$("#prueba_series").click(function(){
		var R = $("#R").val().split("\n");
		prueba_series(R);
	})


});

function deMenorAMayor(elem1, elem2) {return elem1-elem2;}

function pruebachicuadrado(na){

	var n = na.length;
	var inv = [];
	var m = Math.sqrt(n,1/2);
	var m = parseInt(m);

	var est = 0.5*Math.pow(1.644853627+Math.pow(2*n-1,1/2),2);

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

	var msg;

	if(_x<est)
		msg ='El valor estadístico calculado X0 ' +  _x + ' es menor al estadistico correspondiente de la Chi-cuadrada ' + est + '. En consecuencia, no se puede rechazar que los números r siguen una distribución uniforme';

	else
		msg ='El valor estadístico de Chi-cuadrada ' +  est + ' es menor al valor estadistico calculado ' + _x + '. En consecuencia, se puede rechazar que los números r siguen una distribución uniforme'

	alert(msg);


}

function KS(na){

	var n = na.length;

	var est;
	if(n<35)
		est = 1.22/Math.pow(n+0.7,1/2)
	else
		est = 1.22/Math.pow(n,1/2);

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


	if(D<est)
		msg ='El valor estadístico calculado ' +  D + ' es menor al estadistico correspondiente D ' + est + '. En consecuencia, no se puede rechazar que los números r siguen una distribución uniforme';

	else
		msg ='El valor estadístico de D ' +  est + ' es menor al valor estadistico calculado ' + D + '. En consecuencia, se puede rechazar que los números r siguen una distribución uniforme'

	alert(msg);

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

function pruebas_corrida_arriba_abajo(r){
	var media,desviacion,z;
	var n = r.length;
	var c = 0;
	var S = [];

	for (var i = 0; i < r.length; i++) {
		if(i!=0){
			if(r[i]<=r[i-1]) S.push(0);
			else 	S.push(1);
		}
	}

	for (var i = 0; i < S.length; i++) {
		if(i!=S.length-1){
			if(S[i]!=S[i+1]){
				c++;
			}
		}
	}

	media = (2*n-1)/3;
	desviacion = (16*n-29)/90;
	var z = Math.abs((c-media)/(Math.pow(desviacion,1/2)));

	if(z<1.96){
		alert('No se puede rechazar que los numeros del conjunto R son independientes');
	}
	else {
		alert('Se rechaza que los numeros del conjunto R son independientes');
	}


}

function pruebas_corrida_arriba_abajo_media(r){
	var media,desviacion,z;
	var n = r.length;
	var c = 0;
	var S = [];
	var count_one=0;
	var count_zero=0;

	for (var i = 0; i < r.length; i++) {
		if(i!=0){
			if(0.5<=r[i]){
				S.push(1);
				count_one++;
			}
			else{
				S.push(0);
				count_zero++;

			}
		}
	}

	for (var i = 0; i < S.length; i++) {
		if(i!=S.length-1){
			if(S[i]!=S[i+1]){
				c++;
			}
		}
	}

	var Uco = (2*count_zero*count_one)/n + 1/2;
	var des0 = (2*count_zero*count_one*(2*count_zero*count_one-n))/((Math.pow(n,2))*(n-1));

	var z = (c - Uco)/Math.pow(des0,1/2);

	if(-1.96<=z&&z<=1.96){
		alert('No se puede rechazar que los numeros del conjunto R son independientes con un nivel de confianza del 95%');
	}
	else {
		alert('Se puede rechazar que los numeros del conjunto R son independientes con un nivel de confianza del 95%')
	}

	// var long_zero = [];
	// var long_one = []
	// var count = 0;


	// for (var i = 0; i < S.length; i++) {
	// 	if(i!=S.length-1){
	// 		count++;
	// 		if(S[i]!=S[i+1]){
	// 			if(S[i]==1)
	// 				long_zero.push(count);
	// 			else
	// 				long_one.push(count);
	// 			count=0;
	// 			c++;
	// 		}
	// 	}
	// }

	media = (2*n-1)/3;
	desviacion = (16*n-29)/90;
}

function prueba_poker(r){

	var c=0;

	var n = r.length;

	var TD=0,_1P=0,_2P=0, TP=0,
		Q=0,P=0,T=0;

	var values = [];
	var counts = [];

	var D= r[0].length-2;

	for (var k = 0; k < r.length; k++) {
		for (var i = 2; i < r[k].length; i++) {
			for (var j = 2; j < r[k].length; j++) {

				if(j!=i){
					if(jQuery.inArray(r[k][i],values)==-1){
						if(r[k][i]==r[k][j]){
							c++;
						}
					}
				}

			}

			if(jQuery.inArray(r[k][i],values)==-1){
				if(c!=0){
					values.push(r[k][i]);
					counts.push(c);
				}
			}

			c = 0;
		}

		var flag=true;
		var c2 = 0;

		if(counts.length!=0){

			for (var i = 0; i < values.length; i++) {

				if(D==3){
					if(counts[i]==1) _1P++;
					if(counts[i]==2) T++;

					break;
				}


				if(D==4){
					if(counts[i]==1) {c2++;	flag = false;}

					if(1<c2){
						_2P++;
						break
					}

					if(i==values.length-1&&c2==1){
						_1P++;
					}

					if(flag)	{
						if(counts[i]==2) T++;
						if(counts[i]==3) P++;
						break;
					}
				}

				if(D==5){
					if(counts[i]==1) {c2++;	flag = false;}

					if(1<c2){
						_2P++;
						break
					}

					if(i==values.length-1&&c2==1){
						_1P++;
					}


					if(flag)	{
						if(counts[i]==2) {T++; flag = false;}
						if(counts[i]==3) P++;
						if(counts[i]==4) Q++;
						break;
					}
				}



			}
		}else {
			TD++;
		}
		counts = [];
	}

	var a;

	if(D==3)	a = D;
	if(D==4)	a = D+1;
	if(D==5) a = D+3;

	var s=0;

	var PTD,P1P,P2P,PP,PT,PQ,PTD,X;

	if(D==3){
		PTD 	=  ((0.72*n)-TD)/(0.72*n);
		P1P 	=  ((0.27*n)-_1P)/(0.27*n);
		T 		=  ((0.01*n)-T)/(0.01*n);

		X = PTD+P1P+T;
	}

	if(D==4){
		PTD 	=  ((0.5040*n)-TD)/(0.5040*n);
		P1P 	=  ((0.4320*n)-_1P)/(0.4320*n);
		P2P 	=  ((0.0270*n)-_2P)/(0.0270*n);
		PT 	=  ((0.0360*n)-T)/(0.0360*n);
		PP 	=  ((0.001*n)-P)/(0.001*n);

		X = PTD + P1P+P2P+PT+PP;
	}

	if(D==5){
		PTD 	=  ((0.5040*n)-TD)/(0.5040*n);
		P1D 	=  ((0.4320*n)-_1P)/(0.4320*n);
		P2D 	=  ((0.0270*n)-_2P)/(0.0270*n);
		PTP 	= 	((0.0270*n)-TP)/(0.0270*n);
		PT 	=  ((0.0360*n)-T)/(0.0360*n);
		PP 	=  ((0.001*n)-P)/(0.001*n);
		PQ		=	((0.0270*n)-Q)/(0.0270*n);

		X = PTD + P1D+P2D+PTP+PT+PP+PQ;
	}

	if(12.59<X)
		alert('Se rechaza la independencia de los numeros del conjunto ri');
	else {
		alert('No se puede rechazar la independencia de los numeros del conjunto ri');
	}


}

function round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


function prueba_series(r){
	var n = r.length;
	var m = parseInt( Math.pow(n,1/2));


	while (true) {
		m++;
		if(Math.pow(m,1/2) === parseInt(Math.pow(m,1/2), 10))	break;
	}


	var pares_ordenados = [];

	var distancias = [];

	var c = 0	;

	var init = 0;

	var val = Number(1/Math.pow(m,1/2));

	for (var i = 0; i < Math.pow(m,1/2)+1; i++) {

		if(i==0){
			distancias.push({
				x:0,
				y:0
			})
		}
		else {
			distancias.push({
				x:init+val,
				y:init+val
			})

			init = distancias[i].x;
		}

	}

	for (var i = 0; i < n; i++) {
		if(i!=n-1)
			pares_ordenados.push({
				x:Number(r[i]),
				y:Number(r[i+1])
			});
	}

	var flag;
	var cuadrante = [];
	var X = [];
	var E;

	E = (n-1)/m;


	for (var i = 0; i < m; i++) {
		cuadrante[i]=0;
	}

	for (var i = 0; i < pares_ordenados.length; i++) {
		for (var j = 0; j < distancias.length; j++) {
			for (var k = 0; k < distancias.length; k++) {
				if(j!=distancias.length-1){
					if(distancias[j].y<pares_ordenados[i].y &&pares_ordenados[i].y<distancias[j+1].y)
						if(distancias[k].x<pares_ordenados[i].x&&pares_ordenados[i].x<distancias[k+1].x)
							cuadrante[c]++;
				}
				var resta = distancias.length-1;

				if(j!=0||j!=resta)
					if()
					c++;


					&&k!=0||k!=resta)
			}
		}

		c=0;
	}

	var s=0;

	for (var i = 0; i < cuadrante.length; i++) {
		X.push((E-cuadrante[i])/E);

		s += X[i];

	}


}
