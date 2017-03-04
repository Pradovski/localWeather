$(document).ready(function() {
  position();
});

function position() {
  $.ajax({
    type: "POST",
    url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDJFD_JVDG5KvB5nHfowcTLtQlX5qDsk8U", /*url a fazer request*/
    dataType:"json", /*tipo de dado a receber*/
    success: function (data) {
      var latitude = data.location.lat;
      var longitude = data.location.lng;
      $('#latitude').text(latitude);
      $('#longitude').text(longitude);
      reverseGeocoding(latitude,longitude);
      weather(latitude,longitude);
    },
    error: function () {
      $('#erro').text('Can\'t find coordinates');
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
      $('#erro2').text("Can\'t find city");
    }
  });
}

function weather(lat,lng) {
  $.ajax({
    type: "GET",
    url: `https://simple-weather.p.mashape.com/weatherdata?lat=${lat}&lng=${lng}`,
    dataType:"json",
    success: function (data) {
      var temp = data.query.results.channel.item.condition.temp;
      var cond = data.query.results.channel.item.condition.text;
      //var imag = data.query.results.channel.image;
      $('#temp').text(temp);
      $('#cond').text(cond);
      //$('#theDiv').prepend('<img id="theImg" src="theImg.png" />');
    },
    error: function () {
      $('#erro3').text("Can\'t find weather");
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Key", "Ey82Qs9cYemshOTkDjmdGHedDKT7p1lD10ljsntsa1dNilbP8V");
      xhr.setRequestHeader("Accept", "application/json");
    }
  });
}
