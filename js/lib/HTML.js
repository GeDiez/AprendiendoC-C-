var HTML = (function() {  
    //Funciones privadas del modulo  
    var _elemento = function(_tag, _atributos) {
        var _e = document.createElement(_tag);
        if (_atributos !== undefined){
            for (var llave in _atributos){
                _e.setAttribute(llave, _atributos[llave]);
            }
        }
        return _e;
    }
    
    var _text = function(_e, _textContet) {
        if (_textContet !== undefined) {
            _e.textContent = _textContet;            
        }
    }
    
    //Funciones sobre un elemento
    var _append = function(_padre, _elementos) {
        Arreglo.for_each(function (_elemento) {
            _padre.appendChild(_elemento);
        },
        _elementos);
        return _padre;
    }
    
    var _editar = function(_elemento, _atributos) {
        if (_atributos !== undefined){
            for (var llave in _atributos){
                _elemento.setAttribute(llave, _atributos[llave]);
            }
        }
        return _e;
    }
    
    //Definimos cada elemento HTML    
    var _h1 = function(_textContent, _atributos) {
        var _e = _elemento("h1", _atributos);
        _text(_e, _textContent);
        return _e;
    }
    
    var _h2 = function(_textContent, _atributos) {
        var _e = _elemento("h2", _atributos);
        _text(_e, _textContent);
        return _e;
    }
    
    var _h3 = function(_textContent, _atributos) {
        var _e = _elemento("h3", _atributos);
        _text(_e, _textContent);
        return _e;
    }
    
    var _h4 = function(_textContent, _atributos) {
        var _e = _elemento("h4", _atributos);
        _text(_e, _textContent);
        return _e;
    }
    
    var _h5 = function(_textContent, _atributos) {
        var _e = _elemento("h5", _atributos);
        _text(_e, _textContent);
        return _e;
    }
    
    var _h6 = function(_textContent, _atributos) {
        var _e = _elemento("h6", _atributos);
        _text(_e, _textContent);
        return _e;
    }
    
    var _div = function(_atributos) {
        return _elemento("div", _atributos);
    }
    
    var _p = function(_textContent, _atributos) {
        var _e = _elemento("p", _atributos);
        _text(_e, _textContent);
        return _e;
    }
    
    var _span = function(_textContent, _atributos) {
        var _e = _elemento("span", _atributos);
        _text(_e, _textContent);
        return _e;
    }
    
    var _table = function(_atributos) {
        return _elemento("table" ,_atributos);
    }
    
    var _thead = function(_atributos) {
        return _elemento("thead" ,_atributos);
    }
    
    var _tbody = function(_atributos) {
        return _elemento("tbody" ,_atributos);
    } 
    
    var _tfoot = function(_atributos) {
        return _elemento("tfoot" ,_atributos);
    }
    
    var _tr = function(_atributos) {
        return _elemento("tr" ,_atributos);
    }
    
    var _th = function(_textContent, _atributos) {
        var _e = _elemento("th", _atributos);
        _text(_e, _textContent);
        return _e;
    }
    
    var _td = function(_textContent, _atributos) {
        var _e = _elemento("td", _atributos);
        _text(_e, _textContent);
        return _e;
    }
    
    var _ul = function (_atributos) {
        return _elemento("ul", _atributos);
    }
    
    var _ol = function (_atributos) {
        return _elemento("ol", _atributos);
    }
    
    var _li = function(_textContent, _atributos) {
        var _e =  _elemento("li", _atributos);
        _e.textContent = _textContent;
        return _e;
    }
    
    var _img = function(_src, _atributos) {
        var _e = _elemento("img", _atributos);
        _e.src = _src;
        return _e;
    }
    
    var _hr = function() {
        return _elemento("hr");
    }
    
    var _br = function() {
      return _elemento("br");
    }
    
    var _aside = function(_textContent, _atributos) {
        var _e =  _elemento("aside", _atributos);
        _e.textContent = _textContent;
        return _e;
    }
    
    var _label = function(_textContent, _atributos) {
      var _e =  _elemento("label", _atributos);
        _e.textContent = _textContent;
        return _e;
    }
    
    var _script = function(_src) {
        var _e = _elemento("script");
        _e.src  = _src;
        return _e;
    }
    
    var _button = function(_textContent, _atributos){
        var _e = _elemento("button", _atributos);
        _e.textContent = _textContent;
        return _e;
    }
    
    var _textArea = function(_atributos) {
        var _e = _elemento("textArea", _atributos);
        _e.setAttribute("type", "text");
        return _e;
    }

    var _campoTxt = function(_atributos) {
        var _e = _elemento("input", _atributos);
        _e.setAttribute("type", "text");
        return _e;
    }
    
    var _select = function(_atributos) {
      var _e = _elemento("select", _atributos);
      return _e;
    }
    
    var _option = function(_textContent, _atributos) {
      var _e = _elemento("option", _atributos);
      _e.textContent = _textContent;
      return _e;
    }
    
    var _form = function(_atributos) {
      var _e = _elemento("form", _atributos);
        return _e;
    }
    
    var _fieldset = function(_atributos) {
      var _e = _elemento("fieldset", _atributos);
      return _e;
    }
    
    return {
        h1: _h1,
        h2: _h2,
        h3: _h3,
        h4: _h4,
        h5: _h5,
        h6: _h6,
        div: _div,
        p: _p,
        span: _span,
        table: _table,
        thead: _thead,
        tbody: _tbody,
        tfoot: _tfoot,
        tr: _tr,
        th: _th,
        td: _td,
        ul: _ul,
        ol: _ol,
        li: _li,
        img: _img,
        hr: _hr,
        br: _br,
        aside: _aside,
        label: _label,
        select: _select,
        option: _option,
        form: _form,
        fieldset: _fieldset,
        script: _script,
        button: _button,
        campoTxt: _campoTxt,
        textArea: _textArea,
        append: _append,
        editar: _editar
    };
})();
