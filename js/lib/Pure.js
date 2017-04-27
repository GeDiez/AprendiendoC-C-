var Pure = (function() {  
    var _mainPage = function() {
        return HTML.div({
            id: "main"
        });
    }  
    
    var _encabezado = function(_titulo, _subtitulo) {
        return HTML.append(
            HTML.div({class:"header"}),
            [
                HTML.h3(_titulo),
                HTML.h3(_subtitulo)
            ]
        );
    }
    
    var _subencabezado = function(_textContent) {
        return HTML.h3(
            _textContent,
            {
                class:"content-subhead"
            });
    }
    
    var _contenido = function(_id) {
        return HTML.div({
            id: _id,
            class: "content"
        });
    }
    
    var _imagen = function(_src) {
        return HTML.img(
            _src,
            {
                class:"pure-img-responsive"
            }
        );
    }
    
    return {
        Boton: undefined,
        Menu: undefined,
        Tabla: undefined,
        Formulario: undefined,
        GridResponsive: undefined,
        mainPage: _mainPage,
        encabezado: _encabezado,
        subencabezado: _subencabezado,
        contenido: _contenido,
        imagen: _imagen
    }
})();

Pure.GridResponsive = (function() {
  var _gridres = function(_id) {
    return HTML.div({class: "pure-u-1", id: _id});
  }
  
  var _fila = function(_id) {
    if(_id !== undefined){
      return HTML.div({
        class: "pure-g",
        id: _id
      });
    }
    else {
      return HTML.div({
        class: "pure-g",
      });
    }
  }
    
    return {
        fila: _fila,
        gridres: _gridres,
    }
})();

Pure.Boton = (function() {
    var _primario = function(_valor, _atributos) {
        if (_atributos === undefined) {
            return HTML.button(_valor, {class: "pure-button pure-button-primary"}); 
        }
        else{
            _atributos.class += " pure-button pure-button-primary";
            return HTML.button(_valor, _atributos);
        }
    }
    
    var _secundario = function(_valor, _atributos) {
        if (_atributos === undefined) {
            return HTML.button(_valor, {class: "pure-button button-secondary"}); 
        }
        else{
            _atributos.class += " pure-button button-secondary";
            return HTML.button(_valor, _atributos);
        }
    }
    
    var _exito = function(_valor, _atributos) {
        if (_atributos === undefined) {
            return HTML.button(_valor, {class: "pure-button button-success"}); 
        }
        else{
            _atributos.class += " pure-button button-success";
            return HTML.button(_valor, _atributos);
        }
    }
    
    var _error = function(_valor, _atributos) {
        if (_atributos === undefined) {
            return HTML.button(_valor, {class: "pure-button button-error"}); 
        }
        else{
            _atributos.class += " pure-button button-error";
            return HTML.button(_valor, _atributos);
        }
    }
    
    var _precaucion = function(_valor, _atributos) {
        if (_atributos === undefined) {
            return HTML.button(_valor, {class: "pure-button button-warning"}); 
        }
        else{
            _atributos.class = "pure-button button-warning";
            return HTML.button(_valor, _atributos);
        }
    }
    
    return{
        primario: _primario,
        secundario: _secundario,
        exito: _exito,
        error: _error,
        precaucion: _precaucion
    }
})();

Pure.Tabla = (function() {
    var _normal = function(_id) {
        return HTML.table({
            id: _id,
            class: "pure-table"
        });
    }
    
    var _horizontal = function(_id) {
        return HTML.table(
            {
                id: _id,
                class: "pure-table pure-table-horizontal"
            });
    }
    
    var _bordeada = function(_id, _cabeceras, _filas) {
      return HTML.append(
        HTML.table({id: _id, class: "pure-table pure-table-bordered"}),
        [
          HTML.append(
            HTML.thead(),
            [
              HTML.append(
                HTML.tr(),
                Arreglo.map(function (_cabecera) {
                  return HTML.th(_cabecera);
                }, _cabeceras)
              )
            ]),
          HTML.append(
            HTML.tbody(),
            Arreglo.map(function(_fila) {
              var tr = HTML.tr();
              tr.fila = _fila;
              return HTML.append(
                tr,
                Objeto.map_arr(function(_valor) {
                    var _td = HTML.td(_valor, {});
                    _td.fila = _fila;
                  return _td;
                }, _fila)
              );
            }, _filas)
          )          
        ]
      );
    }
    
    var _zebra = function(_id) {
        return HTML.table(
            {
                id: _id,
                class: "pure-table pure-table-striped"
            });
    }
        
    return {
        normal: _normal,
        bordeada: _bordeada,
        horizontal: _horizontal,
        _zebra: _zebra
    }
})();

Pure.Menu = (function() {
    var _hamburguesa = function() {
        /*Para el Menu haburguesa es necesario el archivo ui.js*/
        return HTML.append(
            HTML.span(undefined, {class:"menu-link", id:"menuLink"}),
            [
                HTML.span()
            ]
        )
    }
    
    var _li = function(_textContent, _id) {
        return HTML.li(_textContent, {
            class: "pure-menu-item",
            id: _id
        });
    }
    
    var _li_link = function(_textContent, _id) {
        return HTML.li(_textContent, {
            class: "pure-menu-item pure-menu-link",
            id: _id
        });
    }
    
    var _lado_izquierdo = function(_titulo, _lista) {
        /*Crea un Menu de lado izquierdo, recibe como parametros el titulo del menu y un 
        arreglo de elementos Pure.Menu.li  los cuales se anexaran a las lista*/
        return HTML.append(
                HTML.div({id:"menu"}),
                [
                    HTML.append(
                        HTML.div({class:"pure-menu"}),
                        [
                            HTML.span(_titulo, {class: "pure-menu-heading"}),
                            HTML.append(
                                HTML.ul({class: "pure-menu-list"}),
                                _lista
                            )
                        ])
                ])
    }
    
    var _horizontal = function(_lista) {
        /*Crea un menu horizontal, recibe un arreglo de elementos HTML.li*/
        return HTML.append(
            HTML.div({class: "pure-menu pure-menu-horizontal"}),
            [
                HTML.append(
                    HTML.ul({class: "pure-menu-list"}),                    
                    _lista)
            ]);
    }
    
    return {
        hamburguesa: _hamburguesa,
        li: _li,
        li_link: _li_link,
        lado_izquierdo: _lado_izquierdo,
        horizontal: _horizontal
    }
})();

Pure.Formulario = (function() {
  var _crear = function(_items) {
    return HTML.append(
      HTML.div({class:"pure-form pure-form-aligned"}),
      [
        HTML.append(
          HTML.fieldset(),
          _items 
        )        
      ])
  }
  
  var _campo_texto = function(_texto, _placeholder,_id, _valor) {
    if(_valor !== undefined){
      return HTML.append(
      HTML.div({class:"pure-control-group"}),
      [
        HTML.label(_texto),
        HTML.campoTxt({placeholder: _placeholder, id: _id, value: _valor})
      ]
    );
    }
    return HTML.append(
      HTML.div({class:"pure-control-group"}),
      [
        HTML.label(_texto),
        HTML.campoTxt({placeholder: _placeholder, id: _id})
      ]
    );
  } 
  
  var _combo = function(_id, _texto, _opciones, _f) {
    //1er parametro recibe un texto que contendra la etiqueta de definicion del combobox
    //2do parametro un arreglo de objetos de cada opcion dentro del combo {value: entero, textContent: texto}
    return HTML.append(
      HTML.div({class:"pure-control-group"}),
      [
        HTML.label(_texto),
        HTML.append(
          HTML.select({id: _id}),
          Arreglo.map(function(_opcion){
            var obj = _f(_opcion);
            return HTML.option(obj.texto, {value: obj.valor});
          }, _opciones)
        )
      ]);
  }
  
  return{
    crear: _crear,
    campo_texto: _campo_texto,
    combo: _combo
  }
})();