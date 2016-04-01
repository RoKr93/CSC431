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