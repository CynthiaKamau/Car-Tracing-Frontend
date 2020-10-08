var map, my_position, marker;
var driver_name_1 = "Jane Doe";
var driver_name_2 = "Neil Doer";
var cancelled = "Trip cancelled, please wait as we connect you to another driver";
var image = 'https://images.sendyit.com/web_platform/vendor_type/top/2.svg';

var first_interval = window.onload = function(){
    setTimeout(initMap1, 15000);
  };

  var second_interval = window.onload = function(){
    setTimeout(initMap2, 25000);
  };  

let counter = 0; 

function initMap() {

    var myOptions = {
        zoom: 16,
        center: new google.maps.LatLng(-1.300355, 36.773850),
        mapTypeId: "roadmap"
    };    

    map = new google.maps.Map(document.getElementById('map_canvas_2'), myOptions);

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(-1.300355, 36.773850),
        title: "Your driver",
        visible: true,
        map: map,
        icon: image,
        });

        var infowindow = new google.maps.InfoWindow({
            content: '<div><div>' + driver_name_1 + ' </div><div>' + marker.position + '</div></div>'
        });
    
        infowindow.open(map,marker);
        
  }

  function initMap1() {

    var myOptions = {
        zoom: 16,
        center: new google.maps.LatLng(-1.300355, 36.773850),
        mapTypeId: "roadmap"
    };    

    map = new google.maps.Map(document.getElementById('map_canvas_2'), myOptions);

        var infowindow = new google.maps.InfoWindow({
            content: '<div><div>' + cancelled + ' </div><div>' 
        });
    
        infowindow.open(map);

  }  

  function initMap2() {

    var myOptions = {
        zoom: 16,
        center: new google.maps.LatLng(-1.300355, 36.773850),
        mapTypeId: "roadmap"
    };    

    map = new google.maps.Map(document.getElementById('map_canvas_2'), myOptions);

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(-1.291879, 36.778389),
            title: "Your driver",
            visible: true,
            map: map,
            icon: image,
        });

        var infowindow = new google.maps.InfoWindow({
            content: '<div><div>' + driver_name_2 + ' </div><div>' + marker.position + '</div></div>'
        });
    
        infowindow.open(map,marker);

  }  

initMap();  

 




