function searchButtonScript() {
    electricityResponse = callElectricityAPI();
    airQualityResponse = callAirQualAPI();
    co2Response = callCO2API();
    console.log(airQualityResponse);
    updateOutput(electricityResponse, airQualityResponse, co2Response);
}


function callElectricityAPI() {

}

function callAirQualAPI() {
    return fetch('http://api.airvisual.com/v2/city?city=Los%20Angeles&state=California&country=USA&key=61a0cafd-c4c5-47c1-8250-b2ca702301b2')
        .then(response => response.json())
        .then(data => {
            return data; // Return the parsed data
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
callAirQualAPI().then(data => {
    // Use the parsed data here
    console.log(data);
}).catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
});

function callCO2API() {

}

function updateOutput(electricityResponse, airQualityResponse, co2Response) {

}
