import iconSvg from '../../../assets/marker-icon.svg';
import {marker} from "../../../public/js/app/node_modules_leaflet_dist_leaflet-src_js";

export default async () => {
    const mapEl = document.getElementById('map');
    const formEl = document.querySelector('.form');
    const coordinates = document.getElementById('coordinates');
    const placeName = document.getElementById('name');
    const placeDescription = document.getElementById('description');
    const createMarker = document.getElementById('submit');
    if (mapEl) {
        try {
            const L = await import('leaflet');
            await import('leaflet-gesture-handling');

            const map = L.map(mapEl, {
                center: [54.4526626, 17.0398293],
                zoom: 10,
                gestureHandling: true
            });
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);


            // Reference to marker
            let marker;
            mapEl.addEventListener('dblclick', (event) => {
                formEl.classList.add('active');

                // to find and set coordinates
                const latLng = map.mouseEventToLatLng(event);
                coordinates.value = latLng.lat + ", " + latLng.lng;

                // user input data and click button to create a marker
                createMarker.addEventListener('click', (event) => {
                    event.preventDefault();
                    const name = placeName.value; // get data from user input
                    const description = placeDescription.value;
                    const userData = "<b>Name:</b> " + name + "<br><b>Description:</b> " + description;

                    // icon for marker
                    const customIcon = L.icon({
                        iconUrl: iconSvg,
                        iconSize: [32, 32],
                    });

                    if (marker) {  // update marker data
                        marker.setPopupContent(userData);
                        marker.setIcon(customIcon);
                        marker.setLatLng(latLng);
                    } else {  // create a marker
                        marker = L.marker(latLng, { icon: customIcon, draggable: true }).addTo(map).bindPopup(userData);

                        // to change coordinates.value after dragging a marker
                        marker.addEventListener('dragend', (event) => {
                            const markerLatLng = event.target.getLatLng();
                            coordinates.value = markerLatLng.lat + ", " + markerLatLng.lng;
                        });
                    }
                });
            });
        } catch(error) {
            console.log(error);
        }
    }
};
