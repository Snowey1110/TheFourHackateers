function searchButtonScript() {
    address = document.getElementById("address_input").value;
    city = document.getElementById("city_input").value;
    state = document.getElementById("state_input").value;
    zipcode = document.getElementById("zipcode_input").value;

    console.log(address)
    console.log(city)
    console.log(state)
    console.log(zipcode)

    electricityResponse = callElectricityAPI(address, city, state, zipcode, null);//Ignore house type for now
    airQualityResponse = callAirQualAPI();
    co2Response = callCO2API();

    updateOutput(electricityResponse, airQualityResponse, co2Response);
}




/**
 * 
 * @param {*} address Address of the location
 * @param {*} city City of the location
 * @param {*} state State of the location. Usually this can be done for us automatically from the zipcode
 * @param {*} zip Zip code of the location. REQUIRED NO MATTER WHAT
 * @param {*} type "house" or "apartment"
 * 
 * Returns a promise object that contains the data from the API
 */
function callElectricityAPI(address, city, state, zip, type) {

    let endpoint = "https://apis.wattbuy.com/v3/electricity/estimation"
    let dataQuery = createDataQuery(address, city, state, zip, type);
    let finalURL = endpoint + dataQuery;

    console.log(finalURL)

    let apiKey = "JG93JqFemA7uh5oE5diVca7sztHx4L6y2eXLE6cr"

    let resultOfRequest = electrictyAPIResult(finalURL, apiKey);

    return resultOfRequest;

}


function electrictyAPIResult(finalURL, apiKey) {
    return $.ajax({
        type: "GET",
        url: finalURL,
        dataType: 'json',
        contentType: 'json',
        headers: { 'x-api-key': apiKey },
        success: function (response) {
            return (response)
        }
    });
}


function createDataQuery(address, city, state, zip, type) {
    query = "?";
    atLeastOne = false;

    //We always have this
    if (zip != null && zip != "") {
        query += ("zip=" + zip + "&");
    }

    if (address != null && address != "") {
        query += ("address=" + address.replaceAll(" ", "%20") + "&");
    }

    if (city != null && city != "") {
        query += ("city=" + city + "&");
    }

    if (state != null && state != "") {
        query += ("state=" + state + "&")
    }

    if (type != null) {
        query += ("house_type=" + type);
    }

    return query;
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
            console.log(cityData.pollution[0].aqius);
            return cityData.pollution[0].aqius;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function getCityData() {
    return cityData;
}

function checkPollutionLevel(cityData) {

    const aqiUS = cityData.pollution[0].aqius;
    const aqiCN = cityData.pollution[0].aqicn;

    if (aqiUS <= 100 && aqiCN <= 100) {
        return "good";
    } else if (aqiUS <= 200 && aqiCN <= 200) {
        return "unhealthy";
    } else {
        return "hazardous";
    }
}

function callCO2API() {

}

function updateOutput(electricityResponse, airQualityResponse, co2Response) {
    electricityResponse.done(data => {


        let usage = data.est_usage

        let average = 10632
        let percentBuffer = 0.2

        if (usage > (average - average * percentBuffer) && usage < (average + average * percentBuffer)) {//plus minus 20% of average
            document.getElementById("elec_circle").classList.value = "yellow-circle"
        }
        else if (usage < (average - average * percentBuffer)) {//lower end
            document.getElementById("elec_circle").classList.value = "green-circle"
        }
        else {
            document.getElementById("elec_circle").classList.value = "red-circle"
        }

        console.log(average - average * percentBuffer)
        console.log(average + average * percentBuffer)

        console.log(data)

    });

    airQualityResponse.then(airQualityResponse => {
        console.log(airQualityResponse);
        if (airQualityResponse <= 100) {
            document.getElementById("air_circle").classList.value = "green-circle"
        } else if (airQualityResponse <= 200) {
            document.getElementById("air_circle").classList.value = "yellow-circle"
        } else {
            document.getElementById("air_circle").classList.value = "red-circle"
        }
    });
}