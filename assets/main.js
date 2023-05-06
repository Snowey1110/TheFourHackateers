function searchButtonScript() {
    electricityResponse = callElectricityAPI();
    airQualityResponse = callAirQualAPI();
    co2Response = callCO2API();

    updateOutput(electricityResponse, airQualityResponse, co2Response);
}


function callElectricityAPI() {

}

function callAirQualAPI() {
    const API_KEY = '61a0cafd-c4c5-47c1-8250-b2ca702301b2';
    const url = `https://api.example.com/airquality?key=${API_KEY}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => console.error(error));
}

function callCO2API() {

}

function updateOutput(electricityResponse, airQualityResponse, co2Response) {

}
