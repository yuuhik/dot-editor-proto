
Board.div_repl = (function($) {

  var m_div_repl_output = Board.div_repl_output;
  var m_input_history = Board.input_history;
  var m_text_area = Board.editor;

  var m_active_flag = true;

  var dom = new Object();
  dom.repl_input = null;

  // Replの状態を管理
  // var states = {};
  // states.enableUpdate = true;
  // states.enablePost = true;
  var output_eval_result = function(input_txt) {
    var output_result = YKS.main(input_txt);
    m_input_history.history_add(input_txt);
    m_div_repl_output.output_code(input_txt);
    m_div_repl_output.output_result(output_result);
    m_input_history.current_index_reset();
    dom.repl_input.val('');
  };

  var init_event = function(){

    dom.repl_input.keyup(function(event) {
      console.log(event.keyCode);
      if (event.keyCode === 14 || event.keyCode === 13) {
        if (!!dom.repl_input.val().match(/^[\s\t]*$/)) {
          m_div_repl_output.output_result('');
          return;
        }
        output_eval_result(dom.repl_input.val());
        return;
      }
      if (event.keyCode === 38) {
        // 40 => down
        // 38 => up
        dom.repl_input.val(m_input_history.up_history());
        return;
      }
      if(event.keyCode === 40) {
        dom.repl_input.val(m_input_history.down_history());
        return;
      }
    });
  };

  return {
    init: function() {
      $('#div_content').draggable();
      dom.repl_input = $('#repl_input');
      m_div_repl_output = Board.div_repl_output;
      m_input_history = Board.input_history;
      init_event();
    },
    output_eval_result: function(text) {
      output_eval_result(text);
    },
    fold_repl: function() {
      m_active_flag = false;
      $('#div_content').css("display", "none");
    },
    display_repl: function() {
      m_active_flag = true;
      $('#div_content').css("display", "");
    },
    is_active: function(){
      return m_active_flag;
    }
  };
})(jQuery);
