import L from 'leaflet';
import _ from 'leaflet-gesture-handling';

export default () => {
    const mapEl = document.getElementById('map');

    const map = L.map(mapEl, {
        center: [54.4526626, 17.0398293],
        zoom: 13,
        gestureHandling: true
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}
