import iconSvg from '../../../assets/marker-icon.svg';
import {marker} from "../../../public/js/app/node_modules_leaflet_dist_leaflet-src_js";

const formEl = document.querySelector('.form');
const coordinates = document.getElementById('coordinates');


export default async () => {
    const mapEl = document.getElementById('map');
    if (mapEl) {
        try {
            const L = await import('leaflet');
            await import('leaflet-gesture-handling');

            const map = L.map(mapEl, {
                center: [54.4526626, 17.0398293],
                zoom: 13,
                gestureHandling: true
            });
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);



            // add form after dblclick
            mapEl.addEventListener('dblclick', (event) => {
                formEl.classList.add('active');

                // to find coordinates
                const latLng = map.mouseEventToLatLng(event);

                // icon for marker
                const customIcon = L.icon({
                    iconUrl: iconSvg,
                    iconSize: [32, 32],
                });

                const marker = L.marker(latLng, { icon: customIcon }).addTo(map).bindPopup('some text');
                coordinates.value = latLng.lat + ", " + latLng.lng;

            });
        } catch(error) {
            console.log(error);
        }
    }
};
