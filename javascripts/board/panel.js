var Panel;

(function($){

  var border_color = function ( color ){
    return color - 10 < 0 ? 0 : color - 10;
  };

  Panel = function (x, y, canvas_x, canvas_y, height, width, context) {

    this.context = context;

    this.x = x;
    this.y = y;

    this.canvas_x = canvas_x;
    this.canvas_y = canvas_y;
    this.height = height;
    this.width = width;

    this.live = false;
    this.type = 'flow';

    this.color = {};
    this.color.R = 100;
    this.color.G = 190;
    this.color.B = 100;

    this.in_active = false;
  };
  Panel.prototype.resize = function (canvas_x, canvas_y, panel_size) {
    this.canvas_x = canvas_x;
    this.canvas_y = canvas_y;
    this.height = panel_size;
    this.width = panel_size;
  };
  Panel.prototype.restore = function (restore_data) {
    this.x = restore_data.x;
    this.y = restore_data.y;
    this.live = restore_data.live;
    this.color = restore_data.color;
    this.refresh();
  };
  Panel.prototype.toggleState = function () {
    if (!this.in_active) {
      this.live = !this.live;
      this.refresh();
    }
  };
  Panel.prototype.active_color = function(r, g, b){
    if(r<0){
      this.dead();
      this.refresh();
      return;
    }
    this.live = true;
    this.color = {};
    this.color.R = r;
    this.color.G = g;
    this.color.B = b;
    this.refresh();
  };
  Panel.prototype.dead = function(){
    this.live = false;
    this.refresh();
  };
  Panel.prototype.set_in_active = function(){
    this.in_active = true;
    this.context.fillStyle = '#eeeeee';
    this.context.fillRect(this.canvas_x, this.canvas_y, this.height, this.width);
  };
  Panel.prototype.refresh = function () {
    if (this.in_active) {
      return;
    }
    if (this.live) {
      this.context.fillStyle =
          'rgb('
          + this.color.R
          + ','
          + this.color.G
          + ','
          + this.color.B + ')';
      this.context.fillRect(this.canvas_x, this.canvas_y, this.height, this.width);
      this.context.fillStyle =
          'rgb('
          + border_color(this.color.R)
          + ','
          + border_color(this.color.G)
          + ','
          + border_color(this.color.B) + ')';
      this.context.fillRect(this.canvas_x + 2, this.canvas_y + 2, this.height - 4, this.width - 4);
      return;
    }
    if (!this.live) {
      this.context.fillStyle = '#444444';
      this.context.fillRect(this.canvas_x, this.canvas_y, this.height, this.width);
      this.context.fillStyle = '#333333';
      this.context.fillRect(this.canvas_x + 2, this.canvas_y + 2, this.height - 4, this.width - 4);
      return;
    }
  };
  Panel.prototype.isLive = function () {
    return this.live;
  };
})(jQuery);
