var Board = {};
Board.params = {
  is_smart_phone: false
};

(function($){
  var user_agent = navigator.userAgent;
  Board.params.is_smart_phone = (
    user_agent.match(/Android/i) ||
      user_agent.match(/iPhone/i) ||
      user_agent.match(/iPad/i) ||
      user_agent.match(/iPod/i)
    );
})(jQuery);

// view_helper
Board.util = {};
Board.util.bind_single_action = function(object, thunk) {
  var params = Board.params;
  object.bind((params.is_smart_phone ? 'touchstart' : 'click'), thunk);
};
Board.util.live_single_action = function(object, thunk) {
  var params = Board.params;
  object.live((params.is_smart_phone ? 'touchstart' : 'click'), thunk);
};

