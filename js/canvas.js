// development
// $(function(){ drawSide(); });

//* Drawing styles
var widthHeavy = 10;
var widthThin = 1;
var colorDark = "#000";
var colorLight = "#666";

function drawTop(start, stop) {
  var width = 360;
  var height = 400;
  var centerX = 180;
  var centerY = 220;
  var solarpathStart = start; // Math.PI/4;
  var solarpathEnd = stop; //Math.PI/4*3;

  var canvas = document.getElementById('canvas-top');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    // update on each modification 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
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

function drawSide(angle) {
  var width = 360;
  var height = 400;
  var centerX = 180;
  var centerY = 220;
  var arcCenterY = height - 25;

  var canvas = document.getElementById('canvas-side');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    // update on each modification 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //* Light and heavy
    ctx.beginPath();    
    ctx.moveTo(0, arcCenterY);
    ctx.lineTo(width, arcCenterY); // North mark

    ctx.lineWidth = widthHeavy;
    ctx.strokeStyle = colorLight;
    ctx.stroke();  

    //* Light and thin
    ctx.beginPath();
    ctx.arc(20, arcCenterY, 315, Math.PI, Math.PI*2); // arc

    ctx.moveTo(20, 0); // y
    ctx.lineTo(20, height);

    ctx.lineWidth = widthThin;
    ctx.strokeStyle = colorLight;
    ctx.stroke();    

    //* Dark and heavy
    ctx.beginPath();
    ctx.arc(20, arcCenterY, 315, Math.PI*2 - angle , Math.PI*2); // arc
    
    ctx.lineWidth = widthHeavy;
    ctx.strokeStyle= colorDark;    
    ctx.stroke();
  }
}

