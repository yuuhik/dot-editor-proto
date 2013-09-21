
(function($) {

  Board.board_main = (function(){
    var m_small_board = null;
    var m_canvas = null;
    var m_ctx = null;
    var m_width = 70;
    var m_height = 70;

    var m_panel_size = 10;
    var m_board = [];
    var draw_flag = false;

    var pen_color = {
      R:100,
      G:190,
      B:100
    };
    pen_color.rgb_string = function(){
      return 'rgb('
          + this.R
          + ','
          + this.G
          + ','
          + this.B + ')';
    };
    pen_color.set_rgb = function(r,g,b){
      this.R = r;
      this.G = g;
      this.B = b;
    };

    var canvas_click = function(event) {
      var click_x = event.pageX;
      var click_y = event.pageY;

      // console.log('canvas_click',click_x,click_y);
      var canvasOffsetX = m_canvas.offsetLeft;
      var canvasOffsetY = m_canvas.offsetTop;

      // console.log('canvas_click',canvasOffsetX,canvasOffsetY);
      var canvas_x = click_x - canvasOffsetX;
      var canvas_y = click_y - canvasOffsetY;
      // console.log('canvas_click',canvas_x,canvas_y);

      var canvas_height = $(m_canvas).height();
      var canvas_width = $(m_canvas).width();
      var s_height = canvas_height / m_height;
      var s_width = canvas_width / m_width;


      var x = parseInt(canvas_x/s_height);
      var y = parseInt(canvas_y/s_width);
      console.log('canvas_click',x,y);

      m_board[x][y].toggleState();
    };

    var board_to_canvas = function(coordinate) {
      return {
        x: m_board[coordinate.x][coordinate.y].canvas_x,
        y: m_board[coordinate.x][coordinate.y].canvas_y,
        width: m_board[coordinate.x][coordinate.y].width
      };
    };

    var init = function () {
      var canvas_height = $(m_canvas).height();
      var canvas_width = $(m_canvas).width();
      var s_height = canvas_height / m_height;
      var s_width = canvas_width / m_width;
      console.log(canvas_height,m_height,s_height);
      console.log(canvas_width,m_width,s_width);

      m_board = [];
      for(var i = 0; i < m_width; ++i) {
        m_board[i] = [];
        for(var j = 0; j < m_height; ++j) {
          m_board[i][j] = new Panel(i, j,
                                    i * s_width, j * s_height,
                                    s_width, s_height,
                                    m_ctx);
          m_board[i][j].refresh();
        }
      }
    };

    var draw_start = function(event){
      var click_x = event.pageX;
      var click_y = event.pageY;

      // console.log('canvas_click',click_x,click_y);
      var canvasOffsetX = m_canvas.offsetLeft;
      var canvasOffsetY = m_canvas.offsetTop;

      // console.log('canvas_click',canvasOffsetX,canvasOffsetY);
      var canvas_x = click_x - canvasOffsetX;
      var canvas_y = click_y - canvasOffsetY;
      // console.log('canvas_click',canvas_x,canvas_y);

      var canvas_height = $(m_canvas).height();
      var canvas_width = $(m_canvas).width();
      var s_height = canvas_height / m_height;
      var s_width = canvas_width / m_width;


      var x = parseInt(canvas_x/s_height);
      var y = parseInt(canvas_y/s_width);

      m_board[x][y].active_color(pen_color.R, pen_color.G, pen_color.B);
      draw_flag = true;
    };
    var draw_move = function(event){
      // console.log('draw_flag', draw_flag);
      if(draw_flag === false){
        return;
      }

      var click_x = event.pageX;
      var click_y = event.pageY;

      // console.log('canvas_click',click_x,click_y);
      var canvasOffsetX = m_canvas.offsetLeft;
      var canvasOffsetY = m_canvas.offsetTop;

      // console.log('canvas_click',canvasOffsetX,canvasOffsetY);
      var canvas_x = click_x - canvasOffsetX;
      var canvas_y = click_y - canvasOffsetY;
      // console.log('canvas_click',canvas_x,canvas_y);

      var canvas_height = $(m_canvas).height();
      var canvas_width = $(m_canvas).width();
      var s_height = canvas_height / m_height;
      var s_width = canvas_width / m_width;


      var x = parseInt(canvas_x/s_height);
      var y = parseInt(canvas_y/s_width);
      // console.log('canvas_click',x,y);

      m_board[x][y].active_color(pen_color.R, pen_color.G, pen_color.B);
    };


    var getBoardData = function() {
      var output_json = [];
      $.each(m_board, function(i){
        output_json[i] = [];
        $.each(m_board[i], function(j, panel){
          output_json[i][j] = {
            "x":panel.x,
            "y":panel.y,
            "live":panel.live,
            "color":panel.color
          };
        });
      });
      return output_json;
    };

    var draw_end = function(event){
      draw_flag = false;      
      m_small_board.restore(getBoardData());
    };
    var init_event = function () {
      m_canvas.addEventListener('mousedown', draw_start, false);
      m_canvas.addEventListener("mousemove", draw_move, false);
      m_canvas.addEventListener("mouseup", draw_end, false);
    };
    var remove_board_event = function(){
      m_canvas.removeEventListener('mousemove', canvas_click, false);
    };

    var reset = function() {
      for(var i = 0; i < m_width; ++i) {
        for(var j = 0; j < m_height; ++j) {
          m_board[i][j].dead();
        }
      }
    };

    // initialize
    return {
      init: function ( small_board ) {
        m_small_board = small_board;
        m_canvas = $('#canvas_main').get(0);
        m_ctx = m_canvas.getContext('2d');
        var canvas_width = $(m_canvas).width();
        var s_width = canvas_width / m_width;
        m_panel_size = s_width;

        remove_board_event();

        init();
        init_event();
      },
      resize: function() {
        var canvas_height = $(m_canvas).height();
        var canvas_width = $(m_canvas).width();
        var s_width = canvas_width / m_width;
        console.log(canvas_width,m_width,s_width);
        
        for(var i = 0; i < m_width; ++i) {
          for(var j = 0; j < m_height; ++j) {
            m_board[i][j].resize(i * s_width, j * s_width,
                                 s_width);
            m_board[i][j].refresh();
          }
        }
      },
      board_to_canvas: function(coordinate){
        return board_to_canvas(coordinate);
      },
      // set_in_active: function(board_x, board_y, board_width) {
      //   for(var i = 0; i < board_width; ++i){
      //     for(var j = 0; j < board_width; ++j){
      //       m_board[i+board_x][j+board_y].set_in_active();
      //     }
      //   }
      // },
      reset: function(){
        reset();
      },
      set_color: function(x, y, r, g, b){
        m_board[x][y].active_color(r, g, b);
      },
      draw_line: function(x1,y1,x2,y2) {
        m_ctx.beginPath();
        m_ctx.lineWidth = 5;
        m_ctx.strokeStyle="#ff0000";
        m_ctx.moveTo(m_board[x1][y1].canvas_x,m_board[x1][y1].canvas_y);
        m_ctx.lineTo(m_board[x2][y2].canvas_x,m_board[x2][y2].canvas_y);
        m_ctx.stroke(); 

      },
      
      // dump
      dump: function() {
        var output_json = [];
        $.each(m_board, function(i){
          output_json[i] = [];
          $.each(m_board[i], function(j, panel){
            output_json[i][j] = {
              "x":panel.x,
              "y":panel.y,
              "live":panel.live,
              "next":panel.next
            };
          });
        });
        return JSON.stringify(output_json).replace("}", "}\n", 'g');
      },

      // restore
      restore: function(set_data) {
        $.each(m_board, function(i){
          $.each(m_board[i], function(j){
            var data = set_data[i][j];
            m_board[i][j].restore({
              "x":data.x,
              "y":data.y,
              "live":data.live,
              "next":data.next
            });
            m_board[i][j].refresh();
          });
        });
      },
      debug: function () {
        console.log('m_board', m_board);
      },
      set_pen_color: function(r,g,b){
        pen_color.set_rgb(r,g,b);
      }
    };
  })();
})(jQuery);

