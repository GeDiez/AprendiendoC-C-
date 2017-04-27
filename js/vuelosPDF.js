function PDFvuelos(listVuelos){
	var doc = new jsPDF();
	var salto = 0, i = 0;
	Arreglo.for_each(function(vuelo){
		doc.text(20, salto + 20, 'Opcion de vuelo numero: ' + vuelo[0]);
		doc.text(20, salto + 30, 'aerolinea: '+ vuelo[1]);
		doc.text(20, salto + 40, 'hora salida: '+vuelo[2]);
		doc.text(20, salto + 50, 'hora llegada: '+vuelo[3]);
		doc.text(20, salto + 60, 'costo: '+vuelo[4]);
		salto = salto + 70;
		i++;
		if(i%4 === 0){
			console.log("entro");
			doc.addPage();
			salto = 0;
		}
	}, listVuelos);
	doc.save();
	return doc.output();
}

function subirDrive(file){
	console.log(gapi.auth2.getAuthInstance().$K.Q7.access_token);
	//XHR.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
	XHR.post('https://www.googleapis.com/upload/drive/v3/files?fields=webViewLink&uploadType=resumable',
		JSON.stringify({
			name: 'VuelosPDF'
		}),
		{
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+gapi.auth2.getAuthInstance().$K.Q7.access_token,
			'X-Upload-Content-Type': 'application/pdf',
			'X-Upload-Content-Length': file.length
		},
		function(xhr){
			XHR.put(xhr.getResponseHeader('Location'),
				file,
				{
					'Content-Type': 'application/pdf'
				},
				function(xhr){
					console.info('Subida Exitosa');
					window.alert("Subida Exitosa");
					console.log(xhr);
					document.getElementById('addToCalendar').setAttribute("value", JSON.parse(xhr.response).webViewLink);
					document.getElementById('addToCalendar').style.display = 'block';
					//
					document.getElementById("startendtime").style.display = 'block';
    				document.getElementById("pdesc").style.display = 'block';
    				//
				},
				function(xhr){
					console.info('Error: '+ xhr.responseText);
					console.log(xhr);
				}
				)
		},
		function(xhr){
			console.log(xhr);
		}
		)
	}