$(document).ready(function() {
  var celsius = false;
  position();
  $('#button').on('click',function() {
    var change = document.getElementById("temp").textContent;
    var degrees = parseFloat(change);
    if (celsius) {
      degrees = toFahrenheit(degrees);
      $('#unity').text("˚F");
      $('#button').text("See in Celsius");
    } else {
      degrees = toCelsius(degrees);
      $('#unity').text("˚C");
      $('#button').text("See in Fahrenheit");
    }
    $('#temp').text(degrees);
    celsius = !celsius;
  });
});

function position() {
  $.ajax({
    type: "POST",
    url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDJFD_JVDG5KvB5nHfowcTLtQlX5qDsk8U", /*url a fazer request*/
    dataType:"json", /*tipo de dado a receber*/
    success: function (data) {
      //console.log(JSON.stringify(data));
      var latitude = data.location.lat;
      var longitude = data.location.lng;
      reverseGeocoding(latitude,longitude);
      weather(latitude,longitude);
    },
    error: function () {
      $('#place').text('Couldn\'t find coordinates');
    }
  });
}

function reverseGeocoding(lat,lng) {
  $.ajax({
    type: "POST",
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA3Y5ZVypTIkG_a-7sN9pt6PoPWeOh1ueM`, /*url a fazer request*/
    dataType:"json", /*tipo de dado a receber*/
    success: function (data) {
      //console.log(JSON.stringify(data));
      let place = data.results[2].formatted_address;
      $('#place').text(place);
    },
    error: function () {
      $('#place').text("Couldn\'t find city");
    }
  });
}

function weather(lat,lng) {
  $.ajax({
    type: "GET",
    url: `https://api.darksky.net/forecast/1c6b339f3aa68d0ec000ade2a7f039ef/${lat},${lng}`,
    dataType:"jsonp",
    data: {
      "units" : "us",
      "exclude" : "minutely,hourly,daily,alerts,flags"
    },
    success: function (data) {
      var temp = data.currently.temperature;
      var cond = data.currently.summary;
      $('#temp').text(temp);
      $('#cond').text(cond);
      $("#icon").attr("src", getIcon(data.currently.icon));
    },
    error: function () {
      $('#temp').text("Couldn\'t find weather");
    }
  });
}

function toFahrenheit(degrees) {
  degrees = degrees * (9/5) + 32;
  degrees = degrees * 100;
  degrees = Math.round(degrees);
  return degrees / 100;
}

function toCelsius(degrees) {
  degrees = (degrees - 32) * (5/9);
  degrees = degrees * 100;
  degrees = Math.round(degrees);
  return degrees / 100;
}

function getIcon(icon) {
  var image;
  switch (icon) {
    case "clear-day":
      image = "http://openweathermap.org/img/w/01d.png";
      break;
    case "clear-night":
      image = "http://openweathermap.org/img/w/01n.png";
      break;
    case "rain":
      image = "http://openweathermap.org/img/w/09d.png";
      break;
    case "snow":
    case "sleet":
      image = "http://openweathermap.org/img/w/13d.png";
      break;
    case "fog":
    case "wind":
      image = "http://openweathermap.org/img/w/50d.png";
      break;
    case "cloudy":
      image = "http://openweathermap.org/img/w/04d.png";
      break;
    case "partly-cloudy-day":
      image = "http://openweathermap.org/img/w/02d.png";
      break;
    case "partly-cloudy-night":
      image = "http://openweathermap.org/img/w/02n.png";
      break;
    default:
      image = "http://openweathermap.org/img/w/03d.png";
  }
  return image;
}
