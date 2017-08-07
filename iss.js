var prevLat = null;
var prevLong = null;
var total_dist = 0;
var lat = null;
var long = null;


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
            //console.log([data['iss_position']['longitude'], data['iss_position']['latitude']]);
            //return([data['iss_position']['longitude'], data['iss_position']['latitude']]);

            if (prevLat === null && prevLong === null) {
                prevLat = Number(data['iss_position']['latitude']);
                prevLong = Number(data['iss_position']['longitude']);
                toPct([prevLong, prevLat]);
            }
            else {
                lat = Number(data['iss_position']['latitude']);
                long = Number(data['iss_position']['longitude']);
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
    document.getElementById('distance').innerHTML = Math.round(total_dist) + ' miles';
    prevLong = long;
    prevLat = lat;

}

function main(){
    getCoords('http://api.open-notify.org/iss-now.json');
}

setInterval(main,5000);
