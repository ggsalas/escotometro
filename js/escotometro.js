//* Data
var latitude = ""; 
var lon = 0;
var date = new Date();
date.setDate(21); //allways calc day 21
date.setMonth(11); // start calculating december

//* Data update
$('.lat-value').change(function() {
  latitude = $('.lat-value').val();
  updateView( result( date, latitude) );
  updateSolsticeNames();
});  

$('.december').click(function(){
  updateView( result( date.setMonth(11), latitude) );
  $('.button').removeClass('button-active');
  $(this).addClass('button-active');
  if (latitude <= 0)
    $('.background').css('background-image','url("../img/summer.jpg")');
  else
    $('.background').css('background-image','url("../img/winter.jpg")');
});

$('.march').click(function(){
  updateView( result( date.setMonth(2), latitude ) );
  $('.button').removeClass('button-active');
  $(this).addClass('button-active');  
  $('.background').css('background-image','url(\'../img/equinox.jpg\')');
});

$('.june').click(function(){
  updateView( result( date.setMonth(5), latitude ) )
  $('.button').removeClass('button-active');
  $(this).addClass('button-active');  
  if (latitude <= 0)
    $('.background').css('background-image','url(\'../img/winter.jpg\')');
  else
    $('.background').css('background-image','url(\'../img/summer.jpg\')');
});

//* Perform calculations to get result
var result = function (date, lat) {

  // Solar times for specific date
  var times = SunCalc.getTimes(date, lat, lon);

  // Get sunrise azimuth in degrees
  var sunriseAzimuth = SunCalc.getPosition(times.sunrise,lat, lon).azimuth; // * 180 / Math.PI; 

  // Get sunset azimuth in degrees
  var sunsetAzimuth = SunCalc.getPosition(times.sunset,lat, lon).azimuth; // * 180 / Math.PI;

  // Get max altitude above horizon on the day
  var maxAltitude = SunCalc.getPosition(times.solarNoon, lat, lon).altitude;

  // Get day duration 
  function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes;
  }
  var dayDuration = msToTime(times.sunset - times.sunrise);

  return {
    sunriseAzimuth: sunriseAzimuth,
    sunsetAzimuth: sunsetAzimuth,
    maxAltitude: maxAltitude,
    dayDuration: dayDuration,
  }
}

//* Display result
var updateView = function (position) {
  var start = position.sunriseAzimuth + Math.PI / 2;
  var stop = position.sunsetAzimuth + Math.PI / 2; 
  var totalPath = (( stop - start ) * 180 / Math.PI);
  var maxAltitudeDegrees = position.maxAltitude * 180 / Math.PI;

  if(latitude <= 0){
    drawTop(start, stop);
    totalPath = 360 - (( stop - start ) * 180 / Math.PI);
  }else{
    drawTop(stop, start);
    totalPath = ( stop - start ) * 180 / Math.PI;
  }
  drawSide(position.maxAltitude);

  $('.draw-top-text').html('<h3 class="draw-title">Día</h3>' +
                           '<ul class="draw-result">' +
                             '<li>' + position.dayDuration + ' Hs - ' + totalPath.toFixed(0) + ' º</li>' +
                           '</ul>');

  $('.draw-side-text').html( '<h3 class="draw-title">Altura Máxima</h3>' +
                             '<ul class="draw-result">' +
                               '<li>' + maxAltitudeDegrees.toFixed(0) + 'º</li>' +
                             '</ul>');
}

// Change solstice name for northern hemisphere
var updateSolsticeNames = function(){
  if(latitude > 0){
    $('.december').text("Invierno");
    $('.june').text("Verano");
  }else{
    $('.december').text("Verano");
    $('.june').text("Invierno");      
  }
}
