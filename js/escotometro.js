//* Data
var latitude = ''; 
var lon = 0;
var date = new Date();
date.setDate(21); //allways calc day 21

//* Google map
var gmapLat = ""; 
$('.help').click(function(){
  gmapLat = $('.gllpLatitude').val(); 
  console.log(gmapLat);
});

// default month or selected month
var month = '';
if (month == '')
  month = 'december';
else
  month = month;

// default monthNumber or selected monthNumber
var monthNumber = '';
if (monthNumber == '')
  monthNumber = 11;
else 
  monthNumber = monthNumber;

//* Data update
$('.locationOk').click(function() {
  latitude = $('.gllpLatitude').val();
  var lat0 = parseInt(latitude);
  $('.lat-box').css('display', 'none');
  $('.lat-info').css('display', 'inline-block');
  $('.lat-info').html('Latitud: ' + lat0 + ' º');
  updateView( result( date.setMonth(monthNumber), latitude), month) ;
  updateSolsticeNames();
});  

$('.december').click(function(){
  month = 'december';
  monthNumber = 11;
  updateView( result( date.setMonth(monthNumber), latitude), month);
});

$('.march').click(function(){
  month = 'march';
  monthNumber = 2;
  updateView( result( date.setMonth(monthNumber), latitude), month );  
});

$('.june').click(function(){
  month = 'june';
  monthNumber = 5;
  updateView( result( date.setMonth(monthNumber), latitude), month)
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
var updateView = function (position, month) {
  var start = position.sunriseAzimuth + Math.PI / 2;
  var stop = position.sunsetAzimuth + Math.PI / 2; 
  var totalPath = (( stop - start ) * 180 / Math.PI);
  var maxAltitudeDegrees = position.maxAltitude * 180 / Math.PI;

  console.log(month);
  console.log(monthNumber);

  // display results
  if( latitude != ''){
    $('.dates').css('display','block');
    $('.result').css('display','inline-block');
    $('.container').css('background-color', 'rgba(0,0,0,.5)');
  }

  // draw canvas top 
  if(latitude <= 0){
    drawTop(start, stop);
    totalPath = 360 - (( stop - start ) * 180 / Math.PI);
  }else{
    drawTop(stop, start);
    totalPath = ( stop - start ) * 180 / Math.PI;
  }

  // button selected and background
  if (month == 'december'){
    $('.button').removeClass('button-active');
    $('.december').addClass('button-active');
    if (latitude <= 0)
       $('.background').css('background-image','url("img/summer.jpg")');
    else
       $('.background').css('background-image','url("img/winter.jpg")');
  } else if (month == 'june'){
    $('.button').removeClass('button-active');
    $('.june').addClass('button-active');
    if (latitude <= 0)
       $('.background').css('background-image','url("img/winter.jpg")');
    else
       $('.background').css('background-image','url("img/summer.jpg")');
  } else if (month == 'march'){
    $('.button').removeClass('button-active');
    $('.march').addClass('button-active');   
    $('.background').css('background-image','url("img/equinox.jpg")');
  }

  // draw canvas side 
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


/**
 * Windows magnament
 * *****************/
// Show help window
$( ".nav-button-help" ).click(function() {
  $( ".win-help" ).fadeToggle("slow");
});

// Close button with all windows
$( ".win-close" ).click(function() {
  $( ".window" ).fadeToggle("slow");
});
