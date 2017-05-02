$(document).ready(function(){

	$('#datetimepicker').datetimepicker({
		timepicker:false,
		format:'Y-m-d'
	});
	obtainGeolocation();

	$('#enviarDrive').on('click', function(){
		var data = document.getElementsByTagName('body')[0].vuelos;
		var pdf = PDFvuelos(data);
		subirDrive(pdf);
	});

	$('#enviar').on('click',function(){
		document.getElementById("results").innerHTML="";
		var res = new Object();
		var request = new Object();
		var slice = new Object();
		slice.origin = $('#origen').val();
		slice.destination= $('#destino').val();
		slice.date = $('#datetimepicker').val();
		if($('#escala').is(":checked"))
        {
            slice.maxStops=0;
        }
        
		var arraySlice = new Array();
		arraySlice.push(slice);
		var passengers = new Object();
		if($('#adulto').val()!=0)
		{
			passengers.adultCount = $('#adulto').val();
		}
		else
		{
			passengers.adultCount = 0;
		}
		if($('#nino').val()!=0)
		{
			passengers.childCount = $('#nino').val();
		}
		else
		{
			passengers.childCount = 0;
		}
		passengers.infantInLapCount = 0;
		passengers.infantInSeatCount = 0;
		if($('#adulto_m').val()!=0)
		{
			passengers.seniorCount = $('#adulto_m').val();
		}
		else
		{
			passengers.seniorCount = 0;
		}
			
		request.slice=arraySlice;
		request.passengers=passengers;
		request.solutions=20;
		request.refundable=false;
		res.request=request;
		var myString = JSON.stringify(res);
		console.log(myString);

		$.ajax({
			type: 'POST',
			url: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBZImKUNBTMob-Ojb-KbTEP-_x2aWtp6dI',
			data: myString,
			contentType:'application/json; charset=utf-8',
			dataType:'json',
			success: function(respuesta){
				graficaPrecios(respuesta);
                tablaVuelos(respuesta);
                graficaAerolineas(respuesta);

                // --- Calendar ------------------------------------------------
                if( respuesta.trips.tripOption ){	// Respuesta con datos
                	//var _startendtime = document.getElementById('startendtime');
                	//var _pdesc = document.getElementById('pdesc');

                	//_startendtime.style.display = 'block';
                	//_pdesc.style.display = 'block';
                
                	handleClientLoad();	

                	booksearch();
                }                
			},
			error: function(){
				alert('Error en la peticion');
			}
		});
	});
	
});
function obtainGeolocation(){
	//obtener la posición actual y llamar a la función  "localitation" cuando tiene éxito
	window.navigator.geolocation.getCurrentPosition(localitation);
}
function localitation(geo){
 	// En consola nos devuelve el Geoposition object con los datos nuestros
 	var latitude = geo.coords.latitude;
 	var longitude = geo.coords.longitude;
	console.log(latitude+","+longitude);
	iniciarMapa(latitude,longitude);
	$.ajax({
		type: 'GET',
		url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&key=AIzaSyBZImKUNBTMob-Ojb-KbTEP-_x2aWtp6dI',
		success: function(data){
			$('#origen').val(data.results[0].address_components[5].short_name.toUpperCase().substr(0,3));
		},
		error: function(){
			alert('Error en la peticion');
		}
	});
}

function iniciarMapa(latitud,longitud) {
	var myLatlng = new google.maps.LatLng(latitud,longitud);
	var dest = new google.maps.LatLng(19.453373,-99.050516);
	var map = new google.maps.Map(document.getElementById('map'), {
	   	zoom:7,
	    center: myLatlng
	});
	var inicio = new google.maps.Marker({
		position: myLatlng,
		icon:"img/inicio.png",
		draggable:true,
		map: map
	});
	var destino = new google.maps.Marker({
		position: dest,
		icon:"img/fin.png",
		draggable:true,
		map: map
	});
	$.getJSON("js/aero.json", function(datos) {
        $.each(datos, function(i,obj) {
        	var coor = new google.maps.LatLng(obj.coords.lat,obj.coords.lng);
            var marker = new google.maps.Marker({
				position: coor,
				icon:"img/avion.png",
			    map: map
			});
			var content='<p><strong>Ciudad: </strong>'+ obj.ciudad+'<p><strong>Codigo Aeropuerto: </strong>'+ obj.codigo;
			var infowindow2 = new google.maps.InfoWindow();
				infowindow2.setContent(content);
				google.maps.event.addListener(marker, 'click', function(){
					infowindow2.open(map, marker);

					//--------[]
					var markerlatlng = marker.getPosition();
					console.log(markerlatlng.lat() + " " + markerlatlng.lng());
					facebookSearch(markerlatlng.lat(), markerlatlng.lng());
					//--------[]

				});
        });
    });
	google.maps.event.addListener(inicio, 'dragend', function(){
		masCerca(inicio,"ini");
	});
	google.maps.event.addListener(destino, 'dragend', function(){
		masCerca(destino,"destino");
	});
}
function masCerca(marker,opc)
{
	var markerLatLng = marker.getPosition();
	
	var aeropuertos=[];
	$.ajax({
		type: 'GET',
		url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+markerLatLng.lat()+','+markerLatLng.lng()+'&key=AIzaSyBZImKUNBTMob-Ojb-KbTEP-_x2aWtp6dI',
		success: function(data){
			
			var tam=data.results.length-2;
			var estado=data.results[tam].address_components[0].long_name.toUpperCase();
			var origin = new google.maps.LatLng(markerLatLng.lat(),markerLatLng.lng());
			var conta=0;
			var menor=0;
			$.getJSON("js/aero.json", function(datos) {
		        $.each(datos, function(i,obj) {
		        	if(estado==obj.estado)
		        	{
		        		//alert(obj.estado+" del if");
		        		var des = new google.maps.LatLng(obj.coords.lat,obj.coords.lng);
		        		var service = new google.maps.DistanceMatrixService();
						service.getDistanceMatrix(
						  {
						    origins: [origin],
						    destinations: [des],
						    travelMode: 'DRIVING',
						    unitSystem: google.maps.UnitSystem.METRIC,
						    avoidHighways: false,
						    avoidTolls: false
						  }, function(response, status)
						  	{
						  		if(status !=='OK')
						  		{
						  			alert("Error :"+status);
						  		}
						  		else
						  		{
						  			//alert(response.rows[0].elements[0].distance.value);
						  			conta++;
						  			//alert("contador= "+conta);
						  			//alert(response.rows[0].elements[0].distance.value);
						  			if(conta==1)
						  			{
						  				menor=response.rows[0].elements[0].distance.value;
						  				
						  				//alert("se asigna el valor");
						  				if(opc=="ini")
											{
												$('#origen').val(obj.codigo);
											}
											else
											{
												$('#destino').val(obj.codigo);
											}
						  			}
						  			if(conta>1)
						  			{
						  				if(menor>response.rows[0].elements[0].distance.value)
						  				{
						  					
						  					menor=response.rows[0].elements[0].distance.value;
						  					
						  					if(opc=="ini")
											{
												$('#origen').val(obj.codigo);
											}
											else
											{
												$('#destino').val(obj.codigo);
											}
						  				}
						  			}

						  		}
						});
		        	}
		        });
		    });

		},
		error: function(){
			alert('Error en la peticion');
		}
	});
	
    
}
function graficaPrecios(obj)
{
    var arrayGrafica_adulto=[];
	var arrayGrafica_adulto_m=[];
	var arrayGrafica_nino=[];
	arrayGrafica_adulto.push(new Array('Vuelo','Precio MXN'));
	arrayGrafica_adulto_m.push(new Array('Vuelo','Precio MXN'));
	arrayGrafica_nino.push(new Array('Vuelo','Precio MXN'));
	var tripOpt=obj.trips.tripOption;
	var aerolinea=obj.trips.data.carrier;
	//OPCIONES DE LA GRAFICA
	var options = {
		width: 1200,
		legend: { position: 'none' },
		chart: { subtitle: 'precios en MXN ' },
		axes: {
		   	x: {
		       	0: { side: 'top', label: 'VUELOS PARA EL '+ $('#datetimepicker').val()} // Top x-axis.
		    }
		},
		bar: { groupWidth: "50%" }
	};
	$.each(tripOpt,function(i, value){
		$.each(tripOpt[i].pricing,function(k, value3){
			$.each(aerolinea,function(j,value2){
				if(tripOpt[i].slice[0].segment[0].flight.carrier==aerolinea[j].code)
				{
					if(tripOpt[i].pricing[k].passengers.hasOwnProperty('adultCount'))
					{
						arrayGrafica_adulto.push(new Array(aerolinea[j].name+' '+tripOpt[i].slice[0].segment[0].flight.number, (tripOpt[i].pricing[k].passengers.adultCount*parseInt(tripOpt[i].pricing[k].saleTotal.substr(3))).toString() )) ;
					}
					if(tripOpt[i].pricing[k].passengers.hasOwnProperty('seniorCount'))
					{
						arrayGrafica_adulto_m.push(new Array(aerolinea[j].name+' '+tripOpt[i].slice[0].segment[0].flight.number,(tripOpt[i].pricing[k].passengers.seniorCount*parseInt(tripOpt[i].pricing[k].saleTotal.substr(3))).toString() ));
						
					}
					if(tripOpt[i].pricing[k].passengers.hasOwnProperty('childCount'))
					{
						arrayGrafica_nino.push(new Array(aerolinea[j].name+' '+tripOpt[i].slice[0].segment[0].flight.number,(tripOpt[i].pricing[k].passengers.childCount*parseInt(tripOpt[i].pricing[k].saleTotal.substr(3))).toString() ));
						
					}
					
				}
			});			
		});
	});
	if(arrayGrafica_adulto.length>1)
	{
		$('#precios_adulto').show();
		if($('#adulto').val()>1)
		{
			options.title='PRECIOS PARA '+$('#adulto').val()+' ADULTOS';
		}
		else
		{
			options.title='PRECIOS PARA 1 ADULTO';
		}
		var datos=new google.visualization.arrayToDataTable(arrayGrafica_adulto);
		var chart = new google.charts.Bar(document.getElementById('precios_adulto'));
		
		chart.draw(datos, google.charts.Bar.convertOptions(options));
	}
	else
	{
		$('#precios_adulto').hide();
	}
	if(arrayGrafica_adulto_m.length>1)
	{
		$('#precios_adulto_m').show();
		if($('#adulto').val()>1)
		{
			options.title='PRECIOS PARA '+$('#adulto_m').val()+' ADULTOS MAYORES';
		}
		else
		{
			options.title='PRECIOS PARA 1 ADULTO MAYOR';
		}
		var datos=new google.visualization.arrayToDataTable(arrayGrafica_adulto_m);
		var chart = new google.charts.Bar(document.getElementById('precios_adulto_m'));
		
		chart.draw(datos, google.charts.Bar.convertOptions(options));
	}
	else
	{
		$('#precios_adulto_m').hide();
	}
	if(arrayGrafica_nino.length>1)
	{
		$('#precios_nino').show();
		if($('#nino').val()>1)
		{
			options.title='PRECIOS PARA '+$('#nino').val()+' NI\u00D1OS';
		}
		else
		{
			options.title='PRECIOS PARA 1 NI\u00D1O';
		}
		var datos=new google.visualization.arrayToDataTable(arrayGrafica_nino);
		var chart = new google.charts.Bar(document.getElementById('precios_nino'));
		
		chart.draw(datos, google.charts.Bar.convertOptions(options));
	}
	else
	{
		$('#precios_nino').hide();
	}
	
}
function tablaVuelos(vuelos)
{
	console.log(vuelos);
    var data = new google.visualization.DataTable();
        data.addColumn('string', 'N\u00FAmero de vuelo');
        data.addColumn('string', 'Aerol\u00EDnea');
        data.addColumn('string', 'Hora de salida');
        data.addColumn('string', 'Hora de llegada');
        data.addColumn('string', 'Precio (MXN)');
    var arrayVuelos=[];
    var tripOpt=vuelos.trips.tripOption;
    var aerolinea=vuelos.trips.data.carrier;
    $.each(tripOpt,function(i,value){
        $.each(aerolinea,function(j,value2){
            if(tripOpt[i].slice[0].segment[0].flight.carrier==aerolinea[j].code)
            {
                arrayVuelos.push(new Array(tripOpt[i].slice[0].segment[0].flight.number, aerolinea[j].name, tripOpt[i].slice[0].segment[0].leg[0].departureTime.substr(11,15),tripOpt[i].slice[0].segment[0].leg[0].arrivalTime.substr(11,15), '$'+tripOpt[i].saleTotal.substr(3)));
            }
        });
    });
    var body = document.getElementsByTagName('body')[0];
    body.vuelos = arrayVuelos;
    data.addRows(arrayVuelos);
    var table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(data, {showRowNumber: true, width: '100%', height: '50%'});
}
function graficaAerolineas(aerolineas)
{
    var arrayKilos=[];
    var arrayCantidad=[];
    arrayKilos.push(new Array('Vuelo','Kilos'));
    var tripOpt=aerolineas.trips.tripOption;
    var aerolinea=aerolineas.trips.data.carrier;
   
    $.each(aerolinea,function(j,value2){
        arrayCantidad[j]=0;
        $.each(tripOpt,function(i, value){
            if(tripOpt[i].slice[0].segment[0].flight.carrier==aerolinea[j].code)
            {
                arrayCantidad[j]++;
            }
        });
        arrayKilos.push(new Array(aerolinea[j].name, arrayCantidad[j]));
    });
    var data = google.visualization.arrayToDataTable(arrayKilos);
    var options = {
          title: 'Cantidad de aerolineas con vuelos para la fecha '+$('#datetimepicker').val(),
          is3D: true,
    };
    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
}