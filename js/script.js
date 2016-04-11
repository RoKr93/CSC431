var mymap; // reference to the map

window.onload = function(){
    createMap();
    sceneStart();
}

function createMap() {
    mymap = L.map('mapid').setView([25.774, -80.194], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'rkrishnan.phlglkll',
        accessToken: 'pk.eyJ1IjoicmtyaXNobmFuIiwiYSI6ImNpbWRsZDhwZzAwNmp1Zmx2ZzNvMHJ0dnoifQ.nShFyoLBiyO40eqmQRubVg'
    }).addTo(mymap);
}

function sceneStart() {
	$(".collapse").collapse()({
  		toggle: false,
  		show: false
  	});
}

// when we click the search button, fire off a request
$(document).on("click", "#searchButton", function(){
    console.log("Button pressed!");
    doUnavcoRequest();
});

// AJAX request to get info from UNAVCO database
function doUnavcoRequest() {
    
    // just the base URL with no search query parameters added yet
    var reqUrl = "http://web-services.unavco.org/brokered/ssara/api/sar/search?";
    var isFirstParam = true;
    
    // create an empty object to store all the search parameters
    var searchParams = {
        platform:"",
        relativeOrbit:"",
        absoluteOrbit:"",
        intersectsWith:"",
        frame:"",
        start:"",
        end:"",
        beamMode:"",
        beamSwath:"",
        flightDirection:"",
        lookDirection:"",
        polarization:"",
        collectionName:"",
        processingLevel:"",
        maxResults:"",
        minDoppler:"",
        maxDoppler:"",
        minBaselinePerp:"",
        maxBaselinePerp:"",
        minFaradayRotation:"",
        maxFaradayRotation:"",
        minInsarStackSize:"",
        maxInsarStackSize:""
    };
    
    // get all possible text field values
    searchParams["platform"] = $("#inputPlatform").val();
    searchParams["absoluteOrbit"] = $("#inputAbOrbit").val();
    searchParams["relativeOrbit"] = $("#inputRelOrbit").val();
    searchParams["frame"] = $("#inputFrame").val();
    searchParams["start"] = $("#inputStartDate").val();
    searchParams["end"] = $("#inputEndDate").val();
    searchParams["beamMode"] = $("#inputBeamMode").val();
    searchParams["beamSwath"] = $("#inputSwath").val();
    searchParams["flightDirection"] = $("input[name=optFlight]:checked").val();
    searchParams["lookDirection"] = $("input[name=optLook]:checked").val();
    searchParams["polarization"] = $("#inputPolarization").val();
    searchParams["processingLevel"] = $("#inputProcessingLevel").val();
    searchParams["collectionName"] = $("#inputCollection").val();
    searchParams["maxResults"] = $("#inputMaxResults").val();
    searchParams["maxDoppler"] = $("#inputMaxDoppler").val();
    searchParams["minDoppler"] = $("#inputMinDoppler").val();
    searchParams["maxFaradayRotation"] = $("#inputMaxFaraday").val();
    searchParams["minFaradayRotation"] = $("#inputMinFaraday").val();
    searchParams["maxBaselinePerp"] = $("#inputMaxBaseline").val();
    searchParams["minBaselinePerp"] = $("#inputMinBaseline").val();
    searchParams["maxInsarStackSize"] = $("#inputMaxStackSize").val();
    searchParams["minInsarStackSize"] = $("#inputMinStackSize").val();
    
    // append all of the existing search parameters to the request URL
    for(var key in searchParams) {
        if(searchParams.hasOwnProperty(key)){
            // make sure the value isn't empty
            if(searchParams[key] != "" && searchParams[key] != undefined){
                if(isFirstParam){
                    reqUrl += (key + "=" + searchParams[key]);
                    isFirstParam = false;
                }else{
                    reqUrl += ("&" + key + "=" + searchParams[key]);
                }
            }
        }
    }
    
    console.log(reqUrl);
    
    function successCallback(data) {
        // TODO: actually handle success
        console.log("success!");
    }
    
    function errorCallback() {
        // TODO: actually handle failure
        console.log("error getting UNAVCO data.");
    }
    
    $.ajax({
        url: reqUrl,
        data: {
            format: 'json'
        },
        error: errorCallback,
        dataType: 'json',
        success: successCallback,
        type: 'GET'
    });
}