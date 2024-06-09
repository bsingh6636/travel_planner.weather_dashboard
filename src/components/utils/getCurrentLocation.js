
export function getCurrentCity() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude,longitude)
        const apiKey = "e094373a753743e0b30f2f4951fe562b"
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village;
                document.getElementById('current-location').value = city;
                // console.log(data)
            })
            .catch(error => {
                console.error('Error fetching the city name:', error);
            });
    }

    function error() {
        alert("Unable to retrieve your location.");
    }
}