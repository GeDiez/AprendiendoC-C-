function booksearch(){
	var search=document.getElementById("destino");
	search=search.options[search.selectedIndex].text;
	
	console.log(search);
	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search?q="+search+"&key=AIzaSyCO2f0VkAVQbufTTKLT-J7QVOYtTCxMupk&part=snippet&maxResults=3",
		dataType: "json",
		success: function(data){
			//console.log(data);
			for (var i = 0; i < data.items.length; i++) {
				results.innerHTML += "<h2 id=h2uno >" + data.items[i].snippet.title 
				+ "</h2>";
				results.innerHTML+="<li><iframe  heigth= 500 width=300 src=https://www.youtube.com/embed/"+data.items[i].id.videoId+" allowfullscreen></iframe>"
				//console.log(data.items[i].snippet.thumbnails.default.url);
				console.log(data.items[i].id.videoId);

			}
			


		},
		type:"GET"
	});
}
var mostrar=function(){
var divi= document.getElementById("results");
divi.setAttribute("style","");
}
var ocultar=function(){
var divi= document.getElementById("results");
divi.setAttribute("style","display:none");
}

//document.getElementById('enviar').addEventListener('click', booksearch, false);
var divi= document.getElementById("results");
divi.setAttribute("style","display:none");
document.getElementById('button2').addEventListener('click', mostrar, false);
document.getElementById('button3').addEventListener('click', ocultar, false);