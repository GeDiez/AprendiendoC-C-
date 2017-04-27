var Arreglo = (function(){
    var _map = function (f, arreglo) {
        var arr_salida = [];
        for(var i = 0; i<arreglo.length; i++){
        arr_salida[i] = f(arreglo[i]);
        }
    return arr_salida;
    }
    
    var _filter = function(f, arreglo){
        var arreglo_salida = [];
        for(var i=0;i<arreglo.length;i++){
            if (f(arreglo[i])){
                   arreglo_salida.push(arreglo[i]);
            }
        };
        return arreglo_salida;
    }
    var _for_each = function(f, arreglo){       
        for(var i=0 ; i<arreglo.length ; i++){
            f(arreglo[i]);
        }
    };
    var _reduce = function(valor_inicial, f, arreglo){
        var valor_final = valor_inicial;
        for(var i=0; i<arreglo.length; i++){
            valor_final = f(valor_final, arreglo[i]);
        }
        return valor_final;
    };
    return {
        "for_each": _for_each,
        "filter": _filter,
        "map": _map,
        "reduce": _reduce
    };
})();