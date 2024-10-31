mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  // style: "mapbox://styles/mapbox/streets-v12", // style URL
  style: "mapbox://styles/mapbox/satellite-streets-v12", // style URL
  zoom: 8, // starting zoom
  // center: listing.geometry.coordinates // starting position
  //longitude then latitude
  center: listing.geometry.coordinates, // starting position[lng,lat]
});

// console.log(coordinates);
// Map Marker
const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h6> ${listing.location}</h6><p>Exact location will provided after booking</p>`
    )
  )
  .addTo(map);
