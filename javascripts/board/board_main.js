
(function($){

  var m_div_repl = Board.div_repl;
  var m_board_main = Board.board_main;
  var m_small_board = Board.small_board;
  var m_div_repl_output = Board.div_repl_output;
  var m_editor = Board.editor;
  var m_div_control_bar = Board.div_control_bar;
  var m_div_color_palette = Board.div_color_palette;

  var m_scheme_primitive_functions = Board.scheme_primitive_functions;

  var resize = function (){
    $('#canvas_main').attr({height: 700,
                            width: 700 });
    $('#small-canvas').attr({height: 140,
                             width: 140 });
  };

  var loop1 = function() {
    // m_small_board.restore();
  };

  $(document).ready(function(){
    var m_canvas = $('#canvas_main').get(0);
    // m_canvas.width = 100;
    // m_canvas.height = 100;
    
    // $(window).resize(function() {
    //   resize();
    //   Board.board_main.resize();
    // });

    resize();
    m_div_repl.init();
    m_board_main.init( m_small_board );
    m_small_board.init( m_board_main );
    m_div_repl_output.init();
    m_editor.init();
    m_scheme_primitive_functions.init();
    m_div_control_bar.init();
    m_div_color_palette.init();

    // setInterval(loop1, 3000);
  });
})(jQuery);
