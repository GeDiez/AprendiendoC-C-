var body = document.getElementsByTagName('body');
var s1 = document.createElement('script');
s1.setAttribute('src', 'lib/DOM.js');
var s2 = document.createElement('script');
s2.setAttribute('src' ,'lib/Arreglo.js');
body[0].appendChild(s1);
body[0].appendChild(s2);

function init(arr_librerias) {
	DOM.TAG.append('body',
		Arreglo.map(function(lib){
			document.createElement('script').setAttribute('src' ,'lib/'+lib+'.js');
		}, arr_librerias)
	);
}