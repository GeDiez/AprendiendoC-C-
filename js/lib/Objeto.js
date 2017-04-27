var Objeto = (function(){
//For Each

var _for_each= function(f, obj_entrada){
  for(var llave in obj_entrada){
    f(obj_entrada[llave]);
  }
};

//Filter
var _filter = function(f, obj_entrada){
  var obj_salida = {};
  for(var llave in obj_entrada){
    if(f(obj_entrada)){
      obj_salida[llave] = obj_entrada[llave];
    }
  }
};

//Map

var _map = function(f, obj_entrada){
  var obj_salida = {};
  for(var llave in obj_entrada){
    obj_salida[llave] = f(obj_entrada[llave]);
  }
};

var _map_arr = function(f, obj_entrada) {
  var arr_salida = [];
  var cont=0;
    for(var llave in obj_entrada){
      arr_salida[cont] = f(obj_entrada[llave]);
      cont++;
    }
    return arr_salida;
}

//reduce

var _reduce = function(valor_inicial, f, obj_entrada){
  for(var llave in obj_entrada){
    valor_inicial = f(valor_inicial, obj_entrada[llave]);
  }
  return valor_inicial;
};

var _keys = function(obj){
    var arreglo = [];
    for(var llave in obj){
        arreglo.push(llave);
    }
    return arreglo;
};

var _atributos = function(_obj) {
    var arreglo = [];
    for(var llave in _obj){
        arreglo.push(_obj[llave]);
    }
    return arreglo;
}
return{
    "map":_map,
    "map_arr": _map_arr,
    "filter": _filter,
    "for_each": _for_each,
    "reduce": _reduce,
    "keys": _keys,
    "atributos": _atributos
}
})();