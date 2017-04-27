/* 
 *
 */

// Variable GoogleDeveloperConsole

var CLIENT_ID = '219516285401-pbvl8uancl6cchjndmu4j37q2btj346e.apps.googleusercontent.com';
var apiKey = 'AIzaSyAb6gnHZtLtTp30rMum7BAtW_3N7p8UuRw';
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest", "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest", "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

var authorizeButton = document.getElementById('authorize-button');      
var signoutButton = document.getElementById('signout-button');

var sendButton = document.getElementById('enviarDrive');
var addButton = document.getElementById('addToCalendar');
      
/** 
*  Función invocada cuando se carga la biblioteca javascript de cliente
*/
function handleClientLoad() {
  console.log("Desde handleClientLoad ...");
  gapi.load('client:auth2', initClient);
}

/**
*  Inicializa la biblioteca de cliente de API y configura los usuarios 
*  de estado de inicio de sesión.
*/
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function() {
    // Escuche los cambios de estado de inicio de sesión.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    console.log('este es la auth2: '+gapi.auth2);
    // Maneja el estado de inicio de sesión inicial.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  },function(error){
    console.log(error);
  });
}

/**
*  Se llama cuando el estado de inicio de sesión cambia, para
*  acualizar la interfaz de usuario apropiadamente. Después de 
*  un inicio de sesión, se llama a la API.
*/
function updateSigninStatus(isSignedIn) {
  console.log("Desde updateSigninStatus... ");
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    //addButton.style.display = 'block';
    sendButton.style.display = 'block';
    
    datosusuario();

    /*
    //load the calendar client library
    gapi.client.load('calendar', 'v3', function(){ 
      console.log("Calendar library loaded.");
    });
    */
  } else {
    //
    document.getElementById("startendtime").style.display = 'none';
    document.getElementById("pdesc").style.display = 'none';
    //

    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    addButton.style.display = 'none';
    sendButton.style.display = 'none';

    var _pusuario = document.getElementById("idpusuario");
    _pusuario.textContent = "";
  }
}

/**
*  Sign in usuario al hacer clic en el botón.
*/
function handleAuthClick(event) {    
  gapi.auth2.getAuthInstance().signIn();
  /*
  gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: false}, handleAuthResult);
  return false;
  */
}

/**
*  Sign out usuario al hacer clic en el botón.
*/
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();

  // Logout Gmail
  //document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:8083";
  var _windowlogout = window.open("https://www.google.com/accounts/Logout?continue=https://accounts.google.com/ServiceLogin", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=250,left=250,width=600,height=500");
  setTimeout(function(){
    _windowlogout.close();
  }, 1500);
  
}

/**
*  Fin - Proceso de autenticación. 
*/

/**
* PARTE 2 - Tratando los eventos desde la interfaz de usuario y
* realizar llamadas API. 
**/

addButton.onclick = function(){
  var userChoices = getUserInput();
  console.log(userChoices);
  if (userChoices) 
    createEvent(userChoices);
}

function getUserInput(){
  
  var date = document.querySelector("#datetimepicker").value;
  var startTime = document.querySelector("#start").value;
  var endTime = document.querySelector("#end").value;
  var eventTitle = "Vuelo de: " + document.querySelector("#origen").value + " a " + document.querySelector("#destino").value;
  var description = document.querySelector("#desc").value + "\n" + addButton.getAttribute("value");;

  // Comprobar que los valores de entrada no esten vacíos
  if (date==="" || startTime==="" || endTime===""){
    alert("All your input fields should have a meaningful value.");
    return;
  }else{
    if (description===""){
      return {'date': date, 'startTime': startTime, 'endTime': endTime, 'eventTitle': eventTitle};
    }else{
      return {'date': date, 'startTime': startTime, 'endTime': endTime, 'eventTitle': eventTitle, 'description': description};
    }
  } 

}


// Realizar una llamada de API para crear un evento. Dar comentarios al usuario.
function createEvent(eventData) {
  // Primero se crea el recurso que se enviará al servidor.
    var resource = {
        "summary": eventData.eventTitle,
        "description": eventData.description, 
        "start": {
          "dateTime": new Date(eventData.date + " " + eventData.startTime).toISOString()
        },
        "end": {
          "dateTime": new Date(eventData.date + " " + eventData.endTime).toISOString()
          }
        };
    // Crear la solicitud
    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': resource
    });
  
    // Ejecutar la solicitud y hacer algo con respuesta
    request.execute(function(resp) {
      console.log(resp);
      alert("Tu evento ha sido agregado a tu calendario.");
    });
}

function datosusuario() {
  gapi.client.request({
    'path': 'https://www.googleapis.com/gmail/v1/users/me/profile'
  }).then(function(response) { // Realizar solicitud a la API
    // Procesar respuesta
    var _pusuario = document.getElementById("idpusuario");
    _pusuario.textContent = "Email: " + response.result.emailAddress;

    }, function(reason) { // En caso de error
      console.error('Error: ' + reason.result.error.message);
    });
}