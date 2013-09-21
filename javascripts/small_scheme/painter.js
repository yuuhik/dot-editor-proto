
PainterFrame = function(x, y, width) {
  this.canvas = $('#canvas_main').get(0);
  this.context = this.canvas.getContext('2d');

  this.board_x = x;
  this.board_y = y;
  this.board_width = width;

  var canvas_coordinat = Board.board_main.board_to_canvas({x:this.board_x, y:this.board_y});
  console.log(canvas_coordinat, this.board_width);
  this.canvas_x = canvas_coordinat.x;
  this.canvas_y = canvas_coordinat.y;
  this.canvas_width = canvas_coordinat.width * this.board_width;

  Board.board_main.set_in_active(this.board_x, this.board_y, this.board_width);

  this.context.fillStyle = '#eeeeee';
  this.context.fillRect(this.canvas_x, this.canvas_y,
                        this.canvas_width, this.canvas_width);

  this.context.beginPath();
  this.context.lineWidth = 5;
  this.context.strokeStyle="#ff0000";
  this.context.moveTo(this.canvas_x+5,this.canvas_y+5);
  this.context.lineTo(this.canvas_x+ this.canvas_width -10, this.canvas_y + this.canvas_width - 10);
  this.context.stroke(); 

  this.context.moveTo(this.canvas_x + this.canvas_width - 10, this.canvas_y + 5);
  this.context.lineTo(this.canvas_x + 5, this.canvas_y + this.canvas_width - 10);
  this.context.stroke(); 

};
PainterFrame.prototype.init = function(){
  
};
PainterFrame.prototype.relative_to_abs_x = function(x){
  return this.canvas_x + x;
};
PainterFrame.prototype.relative_to_abs_y = function(y){
  return this.canvas_y + y;
};