
Board.input_history = (function($){
  var MAX_HISTORY = 30;
  var history_list = [];
  var current_index = 0;

  return {
    history_add: function(txt) {
      history_list.unshift(txt);
      if(history_list.length > MAX_HISTORY) {
        history_list.pop();
      }
      current_index = 0;
    },
    up_history: function() {
      var result = history_list[current_index];
      ++current_index;
      if(current_index > history_list.length) current_index = 0;
      return result;
    },
    down_history: function() {
      var result = history_list[current_index];
      --current_index;
      if(current_index < 0) current_index = history_list.length -1;
      return result;
    },
    current_index_reset: function(){
      current_index = 0;
      console.log(history_list, current_index);
    }
  };
})(jQuery);