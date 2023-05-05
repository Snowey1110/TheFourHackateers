function searchButtonScript() {
    electricityResponse = callElectricityAPI();
    airQualityResponse = callAirQualAPI();
    co2Response = callCO2API();

    updateOutput(electricityResponse,airQualityResponse,co2Response);
}


function callElectricityAPI(){

}

function callAirQualAPI(){

}

function callCO2API(){
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://daily-atmosphere-carbon-dioxide-concentration.p.rapidapi.com/api/co2-api',
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ee13e75d97mshaf4fdae5fe7ab48p1cf91ajsn89594c589298',
            'X-RapidAPI-Host': 'daily-atmosphere-carbon-dioxide-concentration.p.rapidapi.com'
        }
    };

    let co2Data;
    $.ajax(settings).done(function (response) {
        co2Data = response;
        console.log(co2Data);
    });
}

function updateOutput(electricityResponse, airQualityResponse, co2Response){

}
