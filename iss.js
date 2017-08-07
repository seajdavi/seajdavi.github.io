var prevLat = null;
var prevLong = null;
var total_dist = 0;
var lat = null;
var long = null;
var altitude;
var speed;


function moveIss(coords) {
    var iss = document.getElementById('image2');
    iss.style.left = coords[0] +'%';
    iss.style.top = (100 - coords[1]) +'%';
    haversine(prevLat, prevLong, lat, long);
}


function toPct(coords) {
    var x = coords[0];
    var y = coords[1];
    x = ((x+180)/ 360) * 100;
    y = ((y+90)/ 180) * 100;

    moveIss([x, y]);
}

function getCoords(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            altitude = Number(data['altitude']) * 0.621371; // kilometers to miles
            speed = Number(data['velocity'])  * 0.621371; // kilometers to miles

            if (prevLat === null && prevLong === null) {
                prevLat = Number(data['latitude']);
                prevLong = Number(data['longitude']);
                toPct([prevLong, prevLat]);
            }
            else {
                lat = Number(data['latitude']);
                long = Number(data['longitude']);
                toPct([long, lat]);
            }

        }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}

function toRad(num) {
   return (num * Math.PI) / 180;
}
function haversine(prevLat, prevLong, lat, long) {
    if (prevLat && lat) {
        var prevLat = toRad(prevLat);
        var prevLong = toRad(prevLong);
        var lat = toRad(lat);
        var long = toRad(long);


        var dlong = long - prevLong;
        var dlat = lat - prevLat;
        var a = (Math.sin(dlat / 2) * Math.sin(dlat / 2)) + Math.cos(prevLat) * Math.cos(lat) * (Math.sin(dlong / 2) * Math.sin(dlong / 2));
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var r = 3956;
        r += 249; // orbital height of space station is 249 miles
        total_dist += c * r;
        updateDist();
    }
}


function updateDist() {
    document.getElementById('distance').innerHTML = 'Distance traveled since loading this page: ' + Math.round(total_dist) + ' miles';
    prevLong = long;
    prevLat = lat;

    document.getElementById('altitude').innerHTML = 'Current Altitude: ' + Math.round(altitude) + ' miles';
    document.getElementById('speed').innerHTML = 'Current Speed: ' + Math.round(speed) + ' mph ('+ (speed/3600).toFixed(2) + ' miles/sec)';
    //document.getElementById('speed').innerHTML = speed.toFixed(2) + ' mph';

}

function main(){
    getCoords('https://api.wheretheiss.at/v1/satellites/25544');
    console.log('https://api.wheretheiss.at/v1/satellites/25544');
}

setInterval(main,2500);
