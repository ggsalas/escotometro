// for development
var widthHeavy = 10;
var widthThin = 1;
var colorDark = "#000";
var colorLight = "#666";

function drawTop() {
  var width = 360;
  var height = 400;
  var centerX = 180;
  var centerY = 220;
  var solarpathStart = Math.PI/4;
  var solarpathEnd = Math.PI/4*3;

  var canvas = document.getElementById('canvas-top');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    
    //* Light and thin
    ctx.beginPath();
    
    ctx.arc(centerX,centerY,160,0,Math.PI*2,true); // circle
    
    ctx.moveTo(0, centerY); // x
    ctx.lineTo(width, centerY);

    ctx.moveTo(centerX, 0); // y
    ctx.lineTo(centerX, height);

    ctx.lineWidth = widthThin;
    ctx.strokeStyle = colorLight;
    ctx.stroke();    

    //* Light and heavy
    ctx.beginPath();    
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, 40); // North mark

    ctx.lineWidth = widthHeavy;
    ctx.strokeStyle = colorLight;
    ctx.stroke();  

    //* Dark and heavy
    ctx.beginPath();
    ctx.arc(centerX, centerY, 160, solarpathStart, solarpathEnd,true); // circle

    ctx.lineWidth = widthHeavy;
    ctx.strokeStyle= colorDark;    
    ctx.stroke();
  }
}

