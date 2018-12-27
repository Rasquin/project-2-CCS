function initMap() {
  var myLatLng = {lat: 10.4806, lng: -66.9036};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Caracas'
  });
}