function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 10.4806, lng: -66.9036 },
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  //Introduce the content of the search box
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      var request = {
        placeId: place.place_id,
        fields: ['name', 'photos', 'url', 'geometry']
      };

      service = new google.maps.places.PlacesService(map);
      service.getDetails(request, callback);

      function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          // Create a marker for each place.

          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            image: place.photos[0],
            position: place.geometry.location,
            url: place.url
            
          }));


        }
      }


      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      }
      else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);


  });

}

$('#place-type').change(function() {

  var place = $('option').val();
  var typeOfPlace = $(this).val(); // Here is saved the actual type of attraction

  $('#pac-input').val(typeOfPlace[0]); //Pass the type of place to the search bol

});
