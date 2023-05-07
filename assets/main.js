function searchButtonScript() {
    electricityResponse = callElectricityAPI();
    airQualityResponse = callAirQualAPI();
    co2Response = callCO2API("Seattle");
    updateOutput(electricityResponse,airQualityResponse,co2Response);
}


function callElectricityAPI(){

}

function callAirQualAPI(){

}


function callCO2API(loc){
    const settings = {
        async: true,
        crossDomain: true,
        //location in url is based upon parameter of method, which is given as the city in searchbar
        url: 'https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${str}',
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ee13e75d97mshaf4fdae5fe7ab48p1cf91ajsn89594c589298',
            'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
        }
    };
    let polData;
    $.ajax(settings).done(function (response) {
        polData = response;
        console.log(polData);
    });
    return polData;
}

function updateOutput(electricityResponse, airQualityResponse, co2Response){

}
