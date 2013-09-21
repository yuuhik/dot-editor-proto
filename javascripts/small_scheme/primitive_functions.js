
Board.scheme_primitive_functions = (function ($) {
  var m_canvas = null;
  var m_context = null;

  var m_main_frame = null;
  var m_board_main = Board.board_main;
  var m_editor = Board.editor;
  var m_div_repl = Board.div_repl;

  var JS_functions = {
    'set-painter-frame': function(args){
      // (make-frame)
      console.log(args);
      var x, y, width;
      x = car(args).value;
      y = cadr(args).value;
      width = caddr(args).value;
      m_main_frame = new PainterFrame(x, y, width);
      return T;
    },
    'set-color': function(args) {
      console.log(args);
      var x, y, colors;
      x = car(args).value;
      y = cadr(args).value;
      colors = caddr(args);
      var r = car(colors).value;
      var g = cadr(colors).value;
      var b = caddr(colors).value;
      m_board_main.set_color(x, y, r, g, b);
      return T;
    },
    'draw-line': function(args){
      console.log(args);
      var x1, y1, x2, y2;
      x1 = car(args).value;
      y1 = cadr(args).value;

      x2 = car(cddr(args)).value;
      y2 = cadr(cddr(args)).value;

      m_board_main.draw_line(x1, y1, x2, y2);
      return T;
    },
    'board-reset': function(){
      m_board_main.reset();
      return T;
    },
    'draw-x': function(){
      return T;
    },
    'load': function(args){
      console.log('load');
      console.log('(begin ' + m_editor.get_val() + ')');
      m_div_repl.output_eval_result('(begin ' + m_editor.get_val() + ')');
      return T;
    }
  };

  return {
    init: function(){
      m_canvas = $('#canvas_main').get(0);
      m_context = m_canvas.getContext('2d');
      m_editor = Board.editor;
    },
    install_JS_functions: function(result){
      var createBind = function (variable, value) {
        var result = {};
        result.variable = variable;
        result.value = value;
        return result;
      };
      var builtinFunc = function (variable, value) {
        result.push(createBind(variable, new LPrimitiveFunc(value)));
      };
      console.log(JS_functions);
      for(key in JS_functions) {
        console.log(key);
        console.log(JS_functions[key]);
        builtinFunc(String(key), JS_functions[key]);
      }
      return result;
    }
  };
})(jQuery);