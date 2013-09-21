
Board.div_color_palette = (function($){

  var m_util = null;
  var m_board_main = null;
  var m_active_flag = true;
  var color_palette = {
    black   : {R:0,
               G:0,
               B:0},
    blue    : {R:0,
               G:0,
               B:255},
    red      : {R:255,
                G:0,
                B:255},
    magenta  : {R:255,
                G:0,
                B:255},
    green    : {R:0,
                G:255,
                B:0},
    cyan     : {R:0,
                G:255,
                B:255},
    yellow   : {R:255,
                G:255,
                B:0},
    white    : {R:255,
                G:255,
                B:255},
    eraser    : {R:-1,
                G:-1,
                B:-1}
  };
  color_palette.gen_css_string = function(key){
    var color = this[key];
    return 'rgb(' + color.R + ',' + color.G + ',' + color.B + ')';
  };

  var dom = {};
  dom.color_palette = null;

  var template = {};
  template.color_palette = function(){
    var result = $('<div />');
    $.each(color_palette, function(key, val) {
      if(key === 'gen_css_string'){
        return true;
      }

      if(key === 'eraser') {
        var div_color = $('<div />');
        div_color.addClass("div_color");
        div_color.css('background-color',
                      '#EEEEEE');
        div_color.css('position',
                      'relative');
        div_color.css('width', '30px');
        div_color.css('height', '30px');
        div_color.css('margin-top','10px');
        div_color.css('margin-left','10px');
        div_color.css('margin-right','10px');
        div_color.css('border', 'solid #333333');
        div_color.css('color', '#111111');
        
        div_color.attr('color-data',key);
        div_color.data('color', val);
        div_color.text('消');
        result.append(div_color);
        return true;
      }

      var div_color = $('<div />');
      div_color.addClass("div_color");
      div_color.css('background-color',
                color_palette.gen_css_string(key));
      div_color.css('position',
                    'relative');
      div_color.css('width', '30px');
      div_color.css('height', '30px');
      div_color.css('margin-top','10px');
      div_color.css('margin-left','10px');
      div_color.css('margin-right','10px');
      div_color.css('border', 'solid #333333');

      div_color.attr('color-data',key);
      div_color.data('color', val);
      // div_color.text(key);
      result.append(div_color);
    });
    return result;
  };

  var init_event = function(){
    $('#color_palette div.div_color').unbind();

    m_util.bind_single_action($('#color_palette div.div_color'), function(){
      var color = $(this).data('color');
      console.log('change color',color);
      m_board_main.set_pen_color(color.R, color.G, color.B);
      
    });
  };

  return {
    init: function(){
      m_board_main = Board.board_main;
      m_util = Board.util;

      dom.color_palette = $('#color_palette');
      // jQuery UI
      dom.color_palette.draggable();
      dom.color_palette.append('<p>パレット</p>');
      dom.color_palette.append(template.color_palette());

      init_event();
    },
    fold_palette: function() {
      m_active_flag = false;
      dom.color_palette.css("display", "none");
    },
    display_palette: function() {
      m_active_flag = true;
      dom.color_palette.css("display", "");
    },
    is_active: function(){
      return m_active_flag;
    }
  };
})(jQuery);