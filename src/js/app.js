'use strict';

import { select, listen } from './utils.js';

const btn = select('#order');

let userMarker = null;

mapboxgl.accessToken = 'pk.eyJ1Ijoia2Vuc2luZHkiLCJhIjoiY2xxMTlqMThjMDNsbjJranc5ZHcwM2RwMyJ9.HTJ_lJrU16bk_u7VUwbz-A';
const map = new mapboxgl.Map({
  container: 'map', 
  style: 'mapbox://styles/mapbox/streets-v11', 
  center: [-123.1207, 49.2827], 
  zoom: 12,
  attributionControl: false 
});

map.addControl(new mapboxgl.AttributionControl({
  compact: true 
}), 'bottom-right'); 

function getLocation(position) {
  let { latitude, longitude } = position.coords;

  map.flyTo({
    center: [longitude, latitude],
    essential: true 
  });

  if (!userMarker) {
    // Create the marker only if it doesn't exist
    userMarker = new mapboxgl.Marker({ color: '#bbe9db' })
      .setLngLat([longitude, latitude])
      .addTo(map);
  } else {
    // Optionally, update the marker position if it already exists
    userMarker.setLngLat([longitude, latitude]);
  }
}

function errorHandler() {
  console.log('Unable to retrieve your location');
}

const options = {
  enableHighAccuracy: true
};

listen('click', btn, () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
  } else {
    console.log('Geolocation is not supported.');
  }
});

