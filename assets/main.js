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
            const cityData = {
                "pollution": [
                    {
                        "ts": data.data.current.pollution.ts,
                        "aqius": data.data.current.pollution.aqius,
                        "mainus": data.data.current.pollution.mainus,
                        "aqicn": data.data.current.pollution.aqicn,
                        "maincn": data.data.current.pollution.maincn,
                        [data.data.current.pollution.mainus]: {
                            "conc": data.data.current.pollution[data.data.current.pollution.mainus]?.conc,
                            "aqius": data.data.current.pollution[data.data.current.pollution.mainus]?.aqius,
                            "aqicn": data.data.current.pollution[data.data.current.pollution.mainus]?.aqicn
                        }
                    }
                ]
            };
            console.log(cityData);
            console.log(checkPollutionLevel(cityData));
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function checkPollutionLevel(cityData) {
    const aqiUS = cityData.pollution[0].aqius;
    const aqiCN = cityData.pollution[0].aqicn;

    if (aqiUS <= 50 && aqiCN <= 50) {
        return "The air quality in this city is good";
    } else if (aqiUS <= 100 && aqiCN <= 100) {
        return "The air quality in this city is moderate";
    } else if (aqiUS <= 150 && aqiCN <= 150) {
        return "The air quality in this city is unhealthy for sensitive groups";
    } else if (aqiUS <= 200 && aqiCN <= 200) {
        return "The air quality in this city is unhealthy";
    } else if (aqiUS <= 300 && aqiCN <= 300) {
        return "The air quality in this city is very unhealthy";
    } else {
        return "The air quality in this city is hazardous";
    }
}

callAirQualAPI();
function callCO2API() {

}

function updateOutput(electricityResponse, airQualityResponse, co2Response) {

}
