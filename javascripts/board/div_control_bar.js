
Board.div_control_bar = (function($){

  var m_div_color_palette = Board.div_color_palette;
  var m_div_repl = Board.div_repl;
  var m_div_editor = Board.editor;

  var dom = {};
  dom.editor_button = null;
  dom.console_button = null;
  dom.color_palett_button = null;

  var toggle_repl = function() {
    if(m_div_repl.is_active()){
      m_div_repl.fold_repl();
      return;
    }
    m_div_repl.display_repl();
    return;
  };
  var toggle_editor = function() {
    if(m_div_editor.is_active()){
      m_div_editor.fold_editor();
      return;
    }
    m_div_editor.display_editor();
    return;
  };
  var toggle_palette = function() {
    if(m_div_color_palette.is_active()){
      m_div_color_palette.fold_palette();
      return;
    }
    m_div_color_palette.display_palette();
    return;
  };

  var init_event = function() {
    // dom.editor_button.click(function(){
    //   toggle_editor();
    //   toggle_repl();
    // });
    dom.console_button.click(function(){
      toggle_repl();
      toggle_editor();
    });
    dom.color_palett_button.click(function(){
      toggle_palette();
    });
  };
  
  return {
    init: function(){
      // dom.editor_button = $('#editor_button');
      dom.console_button = $('#console_button');
      dom.color_palett_button = $('#color_palett_button');

      init_event();
    }
  };
})(jQuery);