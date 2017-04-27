var XHR = (function() {
  var _get = function(_url, _en_caso_de_exito, _en_caso_de_error) {
        var _detectar_cambios_de_estado = function(_xhr, _en_caso_de_exito, _en_caso_de_error) {
            return function() {
                if (_xhr.readyState === 4) {
                    if (_xhr.status >= 200 && _xhr.status <= 299) {
                        _en_caso_de_exito(_xhr);
                    } else {
                        _en_caso_de_error(_xhr);
                    }
                }
            };
        };
        var xhr = new XMLHttpRequest();
        xhr.open("GET", _url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = _detectar_cambios_de_estado(xhr, _en_caso_de_exito, _en_caso_de_error);
        xhr.send();
    };

var _post = function(_url, _cuerpo, _headers,  _en_caso_de_exito, _en_caso_de_error) {
        var _detectar_cambios_de_estado = function(_xhr, _en_caso_de_exito, _en_caso_de_error) {
            return function() {
                if (_xhr.readyState === 4) {
                    if (_xhr.status >= 200 && _xhr.status <= 299) {
                        _en_caso_de_exito(_xhr);
                    } else {
                        _en_caso_de_error(_xhr);
                    }
                }
            };
        };
        var xhr = new XMLHttpRequest();
        xhr.open("POST", _url, true);
        for (var i in _headers) {
            xhr.setRequestHeader(i, _headers[i]);
        }
        xhr.onreadystatechange = _detectar_cambios_de_estado(xhr, _en_caso_de_exito, _en_caso_de_error);
        xhr.send(_cuerpo);
    };
    
var _put = function(_url, _cuerpo,  _headers, _en_caso_de_exito, _en_caso_de_error) {
        var _detectar_cambios_de_estado = function(_xhr, _en_caso_de_exito, _en_caso_de_error) {
            return function() {
                if (_xhr.readyState === 4) {
                    if (_xhr.status >= 200 && _xhr.status <= 299) {
                        _en_caso_de_exito(_xhr);
                    } else {
                        _en_caso_de_error(_xhr);
                    }
                }
            };
        };
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", _url, true);
        for (var i in _headers) {
            xhr.setRequestHeader(i, _headers[i]);
        }
        xhr.onreadystatechange = _detectar_cambios_de_estado(xhr, _en_caso_de_exito, _en_caso_de_error);
        xhr.send(_cuerpo);
    };
    
    var _delete = function(_url,  _en_caso_de_exito, _en_caso_de_error) {
        var _detectar_cambios_de_estado = function(_xhr, _en_caso_de_exito, _en_caso_de_error) {
            return function() {
                if (_xhr.readyState === 4) {
                    if (_xhr.status >= 200 && _xhr.status <= 299) {
                        _en_caso_de_exito(_xhr);
                    } else {
                        _en_caso_de_error(_xhr);
                    }
                }
            };
        };
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", _url, true);
        xhr.onreadystatechange = _detectar_cambios_de_estado(xhr, _en_caso_de_exito, _en_caso_de_error);
        xhr.send();
    };
    
  return {
    get: _get,
    post: _post,
    delete: _delete,
    put: _put
  }
})();