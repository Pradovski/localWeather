$(document).ready(function() {
  position();
  reverseGeocoding();
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
    },
    error: function () {
      $('#erro').text('Not working');
    }
  });
}

function reverseGeocoding() {
  $.ajax({
    type: "POST",
    url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=-27.6092,-48.582&key=AIzaSyA3Y5ZVypTIkG_a-7sN9pt6PoPWeOh1ueM", /*url a fazer request*/
    dataType:"json", /*tipo de dado a receber*/
    success: function (data) {
      $('#place').text(data.results.formatted_address);
    },
    error: function () {
      $('#erro2').text('Not working2');
    }
  });
}
