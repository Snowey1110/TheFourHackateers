function searchButtonScript() {
    electricityResponse = callElectricityAPI();
    airQualityResponse = callAirQualAPI();
    co2Response = callCO2API();
    //remove if want 
    //the str is the string city from the search bar
    airPollution = callAirPollAPI(str);
    directionTime = callDirecAPI(str1, str2);

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
        //this gives general world data for co2 emmisions 
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
    return co2Data;
}

function callAirPollAPI(str) {
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

function callDirecAPI(start, end) {
    const apiKey = "AIzaSyB1csRyD8kzD2z-wvrhLQM41QRCm4KozNg";
const origin = start;
const destination = end;

// Define the API endpoint and parameters
const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;

// Send the request and get the response
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Extract the distance and duration from the response
    const distance = data.routes[0].legs[0].distance.text;
    const duration = data.routes[0].legs[0].duration.text;
    
    // Print the results
    console.log(`Driving distance from ${origin} to ${destination}: ${distance}`);
    console.log(`Driving time from ${origin} to ${destination}: ${duration}`);
  })
  .catch(error => {
    console.error(error);
  });
  let jsonObject = {
    distanceResult: `Driving distance from ${origin} to ${destination}: ${distance}`,
    drivingTime: `Driving time from ${origin} to ${destination}: ${duration}`,
  }
  return jsonObject;
}

function updateOutput(electricityResponse, airQualityResponse, co2Response){

}
