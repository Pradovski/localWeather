$(document).ready(function() {
  position();
});

function position() {
  $.ajax({
    type: "POST", /*get ou post. os dois servem para receber dados, mas post tbm send data along with the request*/
    url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDJFD_JVDG5KvB5nHfowcTLtQlX5qDsk8U", /*url a fazer request*/
    dataType:"json", /*tipo de dado a receber*/
    data:"location", /*dado a receber*/
    success: function (data) /*em caso de sucesso */ {
      $('#longitude').text(data.lng);
      $('#latitude').text(data.lat);
    },
    error: function ()/*em caso de erro*/ {
      $('#erro').text('Not working');
    }
  /*name:value*/});
}
