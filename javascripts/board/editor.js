Board.editor = (function($) {
  var m_active_flag = true;  

  var dom = {};
  dom.div_editor = null;
  dom.textarea_editor = null;

  return {
    init: function(){
      dom.textarea_editor = $('#textarea_editor');
      dom.div_editor = $('#div_editor');
      $('#div_editor').draggable();
    },
    get_val: function(){
      // console.log(m_textarea_editor.val());
      return dom.textarea_editor.val();
    },
    set_val: function(txt){
      return dom.textarea_editor.val(txt);
    },
    fold_editor: function() {
      m_active_flag = false;
      $('#div_editor').css("display", "none");
    },
    display_editor: function() {
      m_active_flag = true;
      $('#div_editor').css("display", "");
    },
    is_active: function(){
      return m_active_flag;
    }
  };
})(jQuery);