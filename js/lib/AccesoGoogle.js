var apikey = 'AIzaSyAb6gnHZtLtTp30rMum7BAtW_3N7p8UuRw';
var CLIENT_ID = '1179412233-c5cjfj8be6995qh6p6eabiajh6p5rnrn.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive";

function cargar() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES,
    apiKey: apikey
  }).then(function() {
    if(gapi.auth2.getAuthInstance().isSignedIn.get()){
      console.log('Logeo Concretado');
    }
    else{
      console.log('No se pudo iniciar el cliente');
    }
  });
}

function verificaSesion(ok, err) {
  gapi.auth2.getAuthInstance().isSignedIn.listen(function(isSignedIn){
    if (isSignedIn) {
      ok();
    }else{
      err();
    }
  });
}


