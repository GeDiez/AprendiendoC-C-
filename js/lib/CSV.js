var CSV = (function() {
  var toArreglo = function(_csv) {
    Arreglo.map(
      function(_linea) {
        return Arreglo.map(
          function(_dato) {
            return _dato
          },
          _linea.split("|")
        );
        
      },
      _csv.split("/n")
    );
  }
  
  return {
    
  }
})();