$(function(){
	$("#calculate_cuadrados").click(function(){
		var count = $("#count").val();
		var seed = $("#seed").val();

		var values =  cuadrados_medios(count,seed);

		$("#X").val("X=");
		for(var i=1;i<values[0].length-1;i++)
			$("#X").val($("#X").val()+"\n"+ "X["+i+"] = "+ values[0][i]);
		$("#Y").val("Y=");
		for(var i=0;i<values[1].length-1;i++)
			$("#Y").val( $("#Y").val()+"\n"+ "Y["+i+"] = "+ values[1][i]);
		$("#R").val("R=");
		for(var i=0;i<values[2].length-1;i++)
			$("#R").val($("#R").val()+"\n"+values[2][i]);


	});

	$("#calculate_productos").click(function(){
		var count = $("#count").val();
		var seed1 = $("#seed1").val();
		var seed2 = $("#seed2").val();
		var values =  productos_medios(count,seed1,seed2);

		$("#X").val("X=");
		for(var i=2;i<values[0].length-1;i++)
			$("#X").val($("#X").val()+"\n"+ "X["+i+"] = "+ values[0][i]);
		$("#Y").val("Y=");
		for(var i=0;i<values[1].length-1;i++)
			$("#Y").val( $("#Y").val()+"\n"+ "Y["+i+"] = "+ values[1][i]);
		$("#R").val("R=");
		for(var i=0;i<values[2].length-1;i++)
			$("#R").val($("#R").val()+"\n"+ "R["+i+"] = "+ values[2][i]);
	});

	$("#calculate_multiplicador").click(function(){
		var count = $("#count").val();
		var seed = $("#seed").val();
		var constant = $("#constant").val();
		var values =  multiplicador_constante(count,seed,constant);

		$("#X").val("X=");
		for(var i=1;i<values[0].length-1;i++)
			$("#X").val($("#X").val()+"\n"+ "X["+i+"] = "+ values[0][i]);
		$("#Y").val("Y=");
		for(var i=0;i<values[1].length-1;i++)
			$("#Y").val( $("#Y").val()+"\n"+ "Y["+i+"] = "+ values[1][i]);
		$("#R").val("R=");
		for(var i=0;i<values[2].length-1;i++)
			$("#R").val($("#R").val()+"\n"+ "R["+i+"] = "+ values[2][i]);
	});

	$("#calculate_congruencial").click(function(){
		var count = $("#count").val();
		var seed = $("#seed").val();
		var m = $("#M").val();
		var a = $("#A").val();
		var c = $("#C").val();
		var values =  algoritmo_congruencial(seed,a,c,m,count);
		
		$("#X").val("X=");
		for(var i=1;i<values[0].length-1;i++)
			$("#X").val($("#X").val()+"\n"+ "X["+i+"] = "+ values[0][i]);
		$("#R").val("R=");
		for(var i=1;i<values[1].length-1;i++)
			$("#R").val($("#R").val()+"\n"+ "R["+i+"] = "+ values[1][i]);

	});

	$("#calculate_branks").click(function(){
		var count = $("#count").val();
		var seed = $("#seed").val();
		var q = $("#Q").val();
		var k = $("#K").val();
		var c = $("#C").val();
		var values =  algoritmo_branks(count,seed,q,c,k)
		
		$("#X").val("X=");
		for(var i=1;i<values[0].length-1;i++)
			$("#X").val($("#X").val()+"\n"+ "X["+i+"] = "+ values[0][i]);
		$("#R").val("R=");
		for(var i=1;i<values[1].length-1;i++)
			$("#R").val($("#R").val()+"\n"+ "R["+i+"] = "+ values[1][i]);

	});

	$("#calculate_algoritmo_multiplicativo").click(function(){
		var count = $("#count").val();
		var seed = $("#seed").val();
		var q = $("#Q").val();
		var k = $("#K").val();
		var values =  algoritmo_multiplicativo(count,seed,k,q);
		
		$("#X").val("X=");
		for(var i=1;i<values[0].length-1;i++)
			$("#X").val($("#X").val()+"\n"+ values[0][i]);
		$("#R").val("R=");
		for(var i=1;i<values[1].length-1;i++)
			$("#R").val($("#R").val()+"\n"+ values[1][i]);

	});

	

});


function cuadrados_medios(cantidad, semilla){
   var semilla_string = semilla.toString();
   var D = semilla_string.length;
   var X = [];
   var Y = [];
   var R = [];

   X[0] = semilla;
   if(D>3){
		for(var i=0;i<=cantidad;i++){
			Y[i]=Math.pow(X[i],2);
			var l = Y[i].toString().length;
			var r = l - D;
		  	if(r%2==0){
				var a = r/2;
		  	}
		  	else
		  	{			  		
				Y[i] = "0"+Y[i];
		  		var l = Y[i].length;
		  		var r = l - D;
		  		var a = r/2;
		  	}
		  	var tempX =Y[i].toString().substring(a,l-a); 		  	
			R[i] = parseFloat("0."+tempX);
            X[i+1]= parseInt(tempX);

		}

		var values = [X,Y,R];

		return values;
   }
   else
	   alert('Ingrese un valor inicial con una cantidad de digitos mayor a 3');
	
}

function productos_medios(cantidad,semilla1,semilla2)
{
	var D1 = semilla1.toString().length;
	var D2 = semilla2.toString().length;
	var X = [];
	var Y = [];
	var R = [];
	if(D1>3){
	  if(D2>3){
	  		if(D1==D2){

				X[0]=semilla1;
				X[1]=semilla2;

				for(var i=0;i<=cantidad;i++){
					Y[i]=X[i]*X[i+1];
					var l = Y[i].toString().length;
					var r = l - D1;
				  	if(r%2==0){
						var a = r/2;
				  	}
				  	else
				  	{			  		
						Y[i] = "0"+Y[i];
				  		var l = Y[i].length;
				  		var r = l - D1;
				  		var a = r/2;
				  	}
				  	var tempX =Y[i].toString().substring(a,l-a); 		  	
					R[i] = parseFloat("0."+tempX);
		            X[i+2]= parseInt(tempX);

				}

				var values = [X,Y,R];
				return values;
		}
		else
			alert('Los dos valores iniciales deben de tener la misma cantidad de digitos')
	  }else
	       alert('Ingrese  mayor a 3 digitos');
   	}
   	else
	   alert('Ingrese un numero con una cantidad de digitos mayor a 3');
}

function multiplicador_constante(cantidad,semilla,constante){
	var D1 = semilla.toString().length;
	var D2 = constante.toString().length;
	var X = [];
	var Y = [];
	var R = [];

	if(D1>3){
		if(D2>3){
			X[0] = semilla;
			for (var i = 0; i <= cantidad; i++) {
				Y[i] = constante*X[i];
				var l = Y[i].toString().length;
				var r = l - D1;
			  	if(r%2==0){
					var a = r/2;
			  	}
			  	else
			  	{			  		
					Y[i] = "0"+Y[i];
			  		var l = Y[i].length;
			  		var r = l - D1;
			  		var a = r/2;
			  	}
		  		var tempX = Y[i].toString().substring(a,l-a);
		  		R[i] = parseFloat("0."+tempX);
				X[i+1]=parseInt(tempX);
			}
			var values = [X,Y,R];
			return [X,Y,R];
		}
		else
			alert('Ingrese una constante mayor a 3 digitos');
	}else
		alert('Ingrese una semilla mayor a 3 digitos');

}

function algoritmo_congruencial(semilla,a,c,m,cantidad){
	var X = [];
	var R = [];
	var c = parseInt(c);


	X[0]=parseInt(semilla);
	for(var i=0;i<=m;i++)
	{
		var mod =a*X[i]+c; 
		X[i+1]=mod%m;
		R[i+1]=X[i+1]/(m-1);
	}
	var values = [X,R];
	return values;
}

function algoritmo_branks(cantidad,semilla,q,c,k){
	var X = [];
	var R = [];	
	X[0]=semilla;
	var a = 1+4*k;
	var m= Math.pow(2,q);
	var c = parseInt(c);

	var flag = false;
	for (var i = 1 ; i < c; i++) {
		if(m%i==0&&c%1==0){
			flag = true;
		}
	}

	if(flag){
		for(var i=0;i<=m;i++)
		{
			X[i+1]=(a*X[i]+c)%m;
			R[i+1]=X[i+1]/(m-1);
		}
		var values = [X,R];
		return values;
	}
	else
		alert('No son relativamente primos');

}

function algoritmo_multiplicativo(cantidad,semilla,k,q){
	var X = [];
	var R = [];	

	if(semilla%2!=0){

		if(q%1==0){

			if(k%1==0){

				X[0]=semilla;
				var a = 5+8*k;
				var m= Math.pow(2,q);
				var N = m/4;
				for(var i=0;i<=N;i++)
				{
					X[i+1]=(a*X[i])%m;
					R[i+1]=X[i+1]/(m-1);
				}

				var values = [X,R];
				return values;
			}
			else
				alert('El valor "k" debe ser entero')
		}	
		else
			alert('El valor "q" debe ser entero')
	}
	else
		alert('La semilla o valor inicial debe ser impar');
}