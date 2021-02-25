var mymap = L.map('worldmap', 
     {
      center: [48.866667, 2.333333],
      zoom: 4
     }
     );


          
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(mymap);


     var customIcon = L.icon({
        iconUrl: './images/leaf-green.png',
        shadowUrl: './images/leaf-shadow.png',
       
        iconSize:   [38, 95], 
        shadowSize:  [50, 64], 
       
        iconAnchor:  [22, 94], 
        shadowAnchor: [4, 62],  
       
        popupAnchor: [-3, -76]
       });


    //  var cityLon = document.getElementById('cityLon')
    //  var Lon = lon.dataset.lon;
    //  console.log(lon)

    //  var cityLat = document.getElementById('cityLat')
    //  var Lat = lat.dataset.lat;
    //  console.log(lon)
     
     var cities = document.getElementsByClassName('list-group-item') 
     for (var i = 0 ; i < cities.length; i++) {
         var lon = cities[i].dataset.lon;
         var lat = cities[i].dataset.lat;
         var name = cities[i].dataset.name;
         L.marker([lat, lon], {icon: customIcon}).addTo(mymap).bindPopup(name)

         console.log(lon, lat)
     }



// Itinéraire

     var roadMap = L.map('roadMap', {
        center: [48.866667, 2.333333],
          zoom: 1
    })   ;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(roadMap);

// var control = 
// L.Routing.control({
//     waypoints: [
//         L.latLng(57.74, 11.94),
//         L.latLng(46.160329, -1.151139)
//     ]
// }).addTo(roadMap)


    var myIcon = L.icon({
        iconUrl: './images/leaf-red.png',
        shadowUrl: './images/leaf-shadow.png',

        iconSize:   [38, 95], 
        shadowSize:  [50, 64], 
       
        iconAnchor:  [22, 94], 
        shadowAnchor: [4, 62],  
       
        popupAnchor: [-3, -76]
    });
    
    L.marker([50.505, 30.57], {icon: myIcon}).addTo(roadMap);