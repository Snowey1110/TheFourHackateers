function searchButtonScript() {
    console.log("Hello");
    electricityResponse = callElectricityAPI(null, null, null, "98012", null);//Hardcoded values for now
    airQualityResponse = callAirQualAPI();
    co2Response = callCO2API();
    

    updateOutput(electricityResponse,airQualityResponse,co2Response);
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
function callElectricityAPI(address, city, state, zip, type){

    let endpoint = "https://apis.wattbuy.com/v3/electricity/estimation"
    let dataQuery = createDataQuery(address, city, state, zip, type);
    let finalURL = endpoint + dataQuery;

    let apiKey = "JG93JqFemA7uh5oE5diVca7sztHx4L6y2eXLE6cr"

    let resultOfRequest = electrictyAPIResult(finalURL,apiKey);

    return resultOfRequest;

}


function electrictyAPIResult(finalURL, apiKey){
    return $.ajax({
        type: "GET",
        url: finalURL,
        dataType: 'json',
        contentType: 'json',
        headers: {'x-api-key':apiKey},
        success: function(response){
            return(response)
        }
    });
}


function createDataQuery(address, city, state, zip, type){
    query = "?";
    atLeastOne = false;

    //We always have this
    if (zip != null) {
        query += ("zip=" + zip + "&");
    }

    if (address != null) {
        query += ("address=" + address.replaceAll(" ", "%") + "&");
    }

    if (city != null) {
        query+= ("city=" + city + "&");
    }

    if (state != null) {
        query += ("state=" + state + "&")
    }

    if (type != null) {
        query += ("house_type=" + type);
    }

    return query;
}

function callAirQualAPI(){

}

function callCO2API(){
    
}

function updateOutput(electricityResponse, airQualityResponse, co2Response){

}

