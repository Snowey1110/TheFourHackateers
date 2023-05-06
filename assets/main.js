function searchButtonScript() {
    console.log("Hello");
    electricityResponse = callElectricityAPI();
    //airQualityResponse = callAirQualAPI();
    //co2Response = callCO2API();

    //updateOutput(electricityResponse,airQualityResponse,co2Response);
}


function callElectricityAPI(){
    // const http = require('https');

    // const options = {
    //   method: 'GET',
    //   hostname: 'apis.wattbuy.com',
    //   port: null,
    //   path: '/v3/electricity/info',
    //   headers: {
    //     accept: 'application/json',
    //     'x-api-key': 'JG93JqFemA7uh5oE5diVca7sztHx4L6y2eXLE6cr'
    //   }
    // };
    
    // const req = http.request(options, function (res) {
    //   const chunks = [];
    
    //   res.on('data', function (chunk) {
    //     chunks.push(chunk);
    //   });
    
    //   res.on('end', function () {
    //     const body = Buffer.concat(chunks);
    //     console.log(body.toString());
    //   });
    // });
    
    // req.end();



    // var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
    // request.open('GET', 'https://some service'); // Open a new connection, using the GET request on the URL endpoint
    // request.send();
    
    // request.onload = async function () {
    //     var data = JSON.parse(this.response);
    //     document.getElementById('testId').InnerHTML = data // depending on your response targert your desired property.
    // }


    // var request = new XMLHttpRequest();
    // request.open('GET','https://apis.wattbuy.com/v3/electricity/info',true);
    

    // request.onload = function(){
    //     if(this.status == 200){
    //         console.log("200 code yay");

    //         var response = JSON.parse(request.responseText);

    //         console.log(response);
    //     }
    //     else {
    //         console.log("failure lol");
    //     }
    // }

    // request.onerror = function(){
    //     console.log("Request Error");
    // }

    // request.setRequestHeader('Authorization', 'Bearer ' + 'JG93JqFemA7uh5oE5diVca7sztHx4L6y2eXLE6cr');

    // request.send();


    const options = {
        method: 'GET',
        hostname: 'apis.wattbuy.com',
        port: null,
        path: '/v3/electricity/info',
        headers: {
          accept: 'application/json',
          'x-api-key': 'JG93JqFemA7uh5oE5diVca7sztHx4L6y2eXLE6cr'
        }
      };


    let dataReturned;

    // $.ajax(options).done(function (response) {
    //     dataReturned = response;
    //     console.log(dataReturned);
    // });



    let endpoint = 'https://apis.wattbuy.com/v3/electricity/estimation'

    let dataQuery = "?zip=98012"

    let finalURL = endpoint + dataQuery;

    let apiKey = 'JG93JqFemA7uh5oE5diVca7sztHx4L6y2eXLE6cr'

    $.ajax({
        type: "GET",
        url: finalURL,
        dataType: 'json',
        contentType: 'json',
        headers: {'x-api-key':apiKey},
        success: onSucc,
        error: onFail
    })


    function onSucc(response){
        console.log(response)
    }

    function onFail(response){
        console.log("FAIL")
        console.log(response);
    }



    // $.ajax({
    //     url: endpoint + "?key=" + apiKey + " &q=" + $( this ).text(),
    //     contentType: "application/json",
    //     dataType: 'json',
    //     success: function(result){
    //         console.log(result);
    //     }
    // })





    

}

function callAirQualAPI(){

}

function callCO2API(){

}

function updateOutput(electricityResponse, airQualityResponse, co2Response){

}
