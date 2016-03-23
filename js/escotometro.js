var date = new Date();
date.setDate(21);
var month = 11;

$('.december').click(function(){
  month = 11; // december
  date.setMonth(month);
  console.log('local Month: ' + month);
  // add class to button "selected"
});
$('.march').click(function(){
  month = 2;
  date.setMonth(month);
  console.log('local Month: ' + month);
});
$('.june').click(function(){
  month = 5;
  date.setMonth(month);
  console.log('local Month: ' + month);
});

//date.setMonth(month);
console.log('global Month: ' + month);


// The responses appears once has a latitude value
$('.lat-value').change(function() {
  var lat = $('.lat-value').val();
  var lon = 0;

  // Solar times for specific date
  var times = SunCalc.getTimes(date, lat, lon);

  // Get sunrise azimuth in degrees
  var sunriseAzimuth = SunCalc.getPosition(times.sunrise,lat, lon).azimuth * 180 / Math.PI; 

  // Get sunset azimuth in degrees
  var sunsetAzimuth = SunCalc.getPosition(times.sunset,lat, lon).azimuth * 180 / Math.PI;

  // Get max altitude above horizon on the day
  var maxAltitude = SunCalc.getPosition(times.solarNoon, lat, lon).altitude * 180 / Math.PI;

  $('.sunriseAzimuth').html('<p>Acimut amanecer: ' + sunriseAzimuth + '<p>');
  $('.sunsetAzimuth').html('<p>Acimut anochecer: ' + sunsetAzimuth + '<p>');
  $('.maxAltitude').html('<p>Altura máxima sobre el horizonte: ' + maxAltitude + '<p>');
  drawTop();
});  

