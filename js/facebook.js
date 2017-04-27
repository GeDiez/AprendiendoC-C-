window.fbAsyncInit = function() {
  FB.init({
    appId      : '1876311639307535',
    xfbml      : true,
    version    : 'v2.9'
  });

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      console.log('Logged in Facebook');
      /*
      //----------[OBTENER TOKEN]---------------------------------
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          var accessToken = response.authResponse.accessToken;
          console.log(accessToken);
        } 
      } );
      //----------[FIN OBTENER TOKEN]-----------------------------
      */
    }else {
      FB.login();
    }
  });

  FB.AppEvents.logPageView();
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function myFacebookLogin() {
  FB.login(function(){}, {scope: 'publish_actions'});
}

function facebookSearch( _latitud, _longitud){
  FB.api("/search", {q: "restaurante"/*_iput_value*/, type: "place", center: _latitud + "," + _longitud, distance: "10000" }, function(response){
    if (!response || response.error) {
      console.error("Error durante facebook search");
    } else {
      if( response.data.length > 0 ){
        var _num_facepaginas = 3;

        if( response.data.length < 3 ){
          _num_facepaginas = response.data.length;
        }

        //-------------[Limpiar DIV paginas_facebook]----------------
        var _div_paginasfacebook = document.getElementById("paginas_facebook");
        while (_div_paginasfacebook.firstChild) {
          _div_paginasfacebook.removeChild(_div_paginasfacebook.firstChild);
        }
        //-------------[Fin Limpiar DIV paginas_facebook]-------------

        for(var i = 0; i < _num_facepaginas; i++){
          facebookUser(response.data[ i ].id);
        }
      }
      
    }
  });
}

function facebookUser(_user_id){
  FB.api(
    _user_id, {fields: 'name, cover, link, picture, location'},  
    function (response) {
      if (response && !response.error) {
        //console.log(response.location);

        var _img_usuario = document.createElement("img");
        _img_usuario.src = response.picture.data.url;
        var _textnombre = document.createElement("a");
        _textnombre.textContent = response.name;
        _textnombre.setAttribute("href", response.link);
        _textnombre.setAttribute("target", "_blank");
        var _calle = response.location.street;
        
        if( typeof _calle === "undefined"){
          _calle = "";
        }

        var _textciudad = document.createTextNode("  " + _calle + " " + response.location.city);

        var _div_datosperfil = document.createElement("div");

        _div_datosperfil.appendChild(_img_usuario);
        _div_datosperfil.appendChild(_textnombre);
        _div_datosperfil.appendChild(_textciudad);

        var _divfacepagina = document.getElementById("paginas_facebook");
        _divfacepagina.appendChild(_div_datosperfil);

      }else{
        console.error("Error durante facebook user");
      }
    }
    );
}