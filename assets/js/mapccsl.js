var service;
var infowindow;
var typeOfPlace = ' ';

$('#place-type').change(function() {

  var place = $('option').val();
  var typeOfPlace = $(this).val(); // Here is saved the actual type of attraction

  initMap(map, typeOfPlace);
});


function initMap(map, typeOfPlace) {

  if (typeOfPlace === undefined) {
    typeOfPlace = ['aquarium']; //There is not aquariums in CCS, only way I found that the map appears clear when loading the map
  }

  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 10.4806, lng: -66.9036 },
    zoom: 12,
    mapTypeId: 'roadmap'
  });

  var request = {
    location: { lat: 10.4806, lng: -66.9036 },
    radius: 15000,
    type: typeOfPlace
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(place);

      }
    }
  }

  function createMarker(place) {

    // Clear out the old markers.

    markers = [];
    markers.forEach(function(marker) {
      marker.setMap(null);
    });

    //Create new markers.
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name
    });

   // console.log(place.opening_hours); //Just checking I get the object place

    google.maps.event.addListener(marker, 'click', function() {
      var infowindow = new google.maps.InfoWindow();
      google.maps.InfoWindowOptions();
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });

    
  }

}
