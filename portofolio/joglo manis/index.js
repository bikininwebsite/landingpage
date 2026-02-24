async function initMap() {
  const [{ InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
    google.maps.importLibrary("maps"),
    google.maps.importLibrary("marker"),
    google.maps.importLibrary("places"),
  ]);

  const mapElement = document.querySelector("gmp-map");
  const map = mapElement.innerMap;
  const placeAutocomplete = document.querySelector("gmp-place-autocomplete");

  map.setOptions({
    clickableIcons: false,
    mapTypeControl: false,
    streetViewControl: false,
  });

  const infowindow = new InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");
  infowindow.setContent(infowindowContent);

  const marker = new AdvancedMarkerElement({
    map,
    collisionBehavior:
      google.maps.CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL,
  });

  placeAutocomplete.addEventListener(
    "gmp-placeselect",
    async (event) => {
      const place = event.place;

      await place.fetchFields({
        fields: ["displayName", "formattedAddress", "location", "placeId"],
      });

      if (!place.location) return;

      map.setCenter(place.location);
      map.setZoom(17);

      marker.position = place.location;

      document.getElementById("place-name").textContent =
        place.displayName;

      document.getElementById("place-id").textContent =
        place.placeId;

      document.getElementById("place-address").textContent =
        place.formattedAddress;

      infowindow.open(map, marker);
    }
  );
}

initMap();
