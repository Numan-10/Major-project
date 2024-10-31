mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  zoom: 9, // starting zoom
  // center: listing.geometry.coordinates // starting position
  //longitude then latitude
  center: coordinates, // starting position[lng,lat]
});

// console.log(coordinates);
// Map Marker
const marker = new mapboxgl.Marker({ color: 'red', rotation: 45 })
  .setLngLat(coordinates) //listing.geometry.coordinates
  .addTo(map);
