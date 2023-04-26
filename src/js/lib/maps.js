export default () => {
    const mapEl = document.getElementById('map');
    if (mapEl) {
        import('leaflet').then((L) => {
            import('leaflet-gesture-handling').then(() => {
                const map = L.map(mapEl, {
                    center: [54.4526626, 17.0398293],
                    zoom: 13,
                    gestureHandling: true
                });
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}
