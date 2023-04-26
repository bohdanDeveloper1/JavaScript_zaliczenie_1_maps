import iconSvg from '../../../assets/marker-icon.svg';


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

            const icon = L.icon({
                iconUrl: iconSvg,
                // shadowUrl: 'leaf-shadow.png',

                iconSize:     [38, 95],
                shadowSize:   [50, 64],
                iconAnchor:   [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor:  [-3, -76]
            });
            L.marker([54.4526626, 17.0398293], {icon: icon}).addTo(map);
        } catch(error) {
            console.log(error);
        }
    }
};
