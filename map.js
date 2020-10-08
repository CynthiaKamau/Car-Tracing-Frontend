var map, marker, path, polylineCoords;
var startPos = [-1.298982, 36.776811];
var driver_name = "John Doe";
var speed = 50; // km/h

var delay = 100;
// If you set the delay below 1000ms and you go to another tab,
// the setTimeout function will wait to be the active tab again
// before running the code.

function animateMarker(marker, coords, km_h)
{
    var target = 0;
    var km_h = km_h || 50;
    coords.push([startPos[0], startPos[1]]);
    
    function goToPoint()
    {
        var lat = marker.position.lat();
        var lng = marker.position.lng();
        var step = (km_h * 1000 * delay) / 3600000; // in meters
        
        var dest = new google.maps.LatLng(
        coords[target][0], coords[target][1]);
        
        var distance =
        google.maps.geometry.spherical.computeDistanceBetween(
        dest, marker.position); // in meters
        
        var numStep = distance / step;
        var i = 0;
        var deltaLat = (coords[target][0] - lat) / numStep;
        var deltaLng = (coords[target][1] - lng) / numStep;
        
        function moveMarker()
        {
            lat += deltaLat;
            lng += deltaLng;
            i += step;
            addCoord(lat, lng);
            if (i < distance)
            {
                marker.setPosition(new google.maps.LatLng(lat, lng));
                setTimeout(moveMarker, delay);
            }
            else
            {   marker.setPosition(dest);
                target++;
                if (target == coords.length){ target = 0; }
                
                setTimeout(goToPoint, delay);
            }

            var infowindow = new google.maps.InfoWindow({
                content: '<div><div>' + driver_name + ' </div><div>' + lat + '</div><div>' + lng + '</div></div>'
            });

            infowindow.open(map,marker); 

        }
        
        moveMarker();
        }
    goToPoint();
}


//To add a Point on the polyline call
function addCoord(lat, lng) {
   var point = new google.maps.LatLng(lat, lng);
   var coords = path.getPath();
   coords.push(point);
}

function initialize()
{
    var myOptions = {
        zoom: 16,
        center: new google.maps.LatLng(-1.298982, 36.776811),
        mapTypeId: "roadmap"
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var image = 'https://images.sendyit.com/web_platform/vendor_type/top/2.svg';
    
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(startPos[0], startPos[1]),
        title: "Your driver",
        visible: true,
        map: map,
        icon: image,
    });

    marker.setMap(map);
    
    google.maps.event.addListenerOnce(map, 'idle', function()
    {
        animateMarker(marker, [
            // The coordinates of each point you want the marker to go to.
            // You don't need to specify the starting position again.
            [-1.297459, 36.776747],
            [-1.296193, 36.776726],
            [-1.296097, 36.779236],
            [-1.296151, 36.777637],
            [-1.296215, 36.776693],
            [-1.294252, 36.776586],
            [-1.294048, 36.776790],
            [-1.293973, 36.779118],
            [-1.292622, 36.779075],
            [-1.291844, 36.779049],

        ], speed);
    });

	polylineCoords = [];
    
    var startCoords = new google.maps.LatLng(startPos[0], startPos[1]);
    
    polylineCoords.push(startCoords);

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
     });

    path = new google.maps.Polyline({
      path: polylineCoords,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    
    path.setMap(map);
}

initialize();
