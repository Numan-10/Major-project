
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  zoom: 9, // starting zoom
  // center: listing.geometry.coordinates // starting position
  //longitude then latitude
  center: [77.209, 28.6139], // starting position[lng,lat]
});
