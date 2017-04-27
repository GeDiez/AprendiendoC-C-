var DOM = (function () {
    var _onclick = function(_f) {
        document.addEventListener("click", _f, false);
    }
    
    return {
        "onclick": _onclick,
        "ID": undefined,
        "Tag": undefined,
        "Class": undefined
    }
})();

DOM.Class = (function() {
  var _click = function(_clase, _f) {
    var _arr_elementos = document.getElementsByClassName(_clase);
    Arreglo.for_each(function(_e) {
      _e.addEventListener("click", _f, false);
    }, _arr_elementos); 
  }
  
  return{
    "click": _click
  }
})();

DOM.ID = (function() {
    var _get = function(_id) {
        return document.getElementById(_id);        
    }
    
    var _append =  function (_id, _elementos) {
        var _e = document.getElementById(_id);
        Arreglo.for_each(
            function(elemento) {
                _e.appendChild(elemento);
            },
            _elementos
        );
    }
    
    var _limpiar = function(_id) {
        var _e = document.getElementById(_id);
        while (_e.hasChildNodes()){
            _e.removeChild(_e.firstChild);
        }
    }
    
    var _click = function(_id, _f) {
        var _e = document.getElementById(_id);
        _e.addEventListener("click", _f, false);
    }
    
    var _value = function(_id) {
      var _e = document.getElementById(_id);
      return _e.value;
    }
    return{
        get: _get,
        append: _append,
        limpiar: _limpiar,
        click: _click,
        value: _value
    }
})();

DOM.TAG = (function() {
    var _append =  function (_tag, _elementos) {
        var _e = document.getElementsByTagName(_tag);
        Arreglo.for_each(
            function(elemento) {
                _e.appendChild(elemento);
            },
            _elementos
        );
    }

    var _get = function(_tag) {
        return document.getElementsByTagName(_tag);
    }
    
    var _click = function(_tag, _f) {
      var _e = document.getElementsByTagName(_tag)[0];
      _e.addEventListener("click", _f, false); 
    }
    
    var _click_varios = function(_tag, _f){
      var _es = document.getElementsByTagName(_tag);
      Arreglo.for_each(
        function(_t) {
          _t.addEventListener("click", _f, false);
        },
        _es
      );
    }
    
    return{
        get: _get,
        append: _append,
        click: _click,
        click_varios: _click_varios
    }
})();