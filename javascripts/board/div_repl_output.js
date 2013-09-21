
Board.div_repl_output = (function($) {
  var DISPLAY_HISTORY_NUMBER =12;

  var dom = {};
  dom.repl_output = null;

  var template = {};
  template.pre_code = function(src) {
    return $(
      '<pre class="repl_output"><code class="repl_output_code lisp">' +
          src +
          '</code></pre>');
  };
  template.pre_result = function(result) {
    return $(
      '<pre class="repl_output_result"><code class="repl_output_result lisp"> => ' +
          result +
          '</code></pre>');
  };


  // Replの状態を管理
  var states = {};
  states.enableUpdate = true;
  states.enablePost = true;

  // 出力
  var output_code = function (code) {
    console.log('output_code', dom.repl_output.children('pre').length);
    var pre = template.pre_code(code);
    dom.repl_output.append(pre);
    if (dom.repl_output.children('pre').length>DISPLAY_HISTORY_NUMBER) {
      dom.repl_output.children('pre:first').remove();
    }
  };

  // 出力
  var output_result = function (code) {
    var pre = template.pre_result(code);
    dom.repl_output.append(pre);
    if (dom.repl_output.children('pre').length>DISPLAY_HISTORY_NUMBER) {
      dom.repl_output.children('pre:first').remove();
    }
  };


  return {
    init: function() {
      dom.repl_output = $("#div_repl_output");
    },
    output_code: function(code) {
      output_code(code);
    },
    output_result: function(code) {
      output_result(code);
    }
  };
})(jQuery);