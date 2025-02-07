// Creating the map object
let myMap = L.map("map", {
    center: [27.96044, -82.30695],
    zoom: 7
  });

  // Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// get the data from the geoJSON file using D3
d3.json("ACS-ED_2014-2018_Economic_Characteristics_FL.geojson").then(
    (data)=>{
        console.log(data)

           // make a choropleth layer
        let geojson = L.choropleth(data, {
            // define the property to use
            valueProperty: "DP03_16E", // households with children between 6-17 years old
            // set a color scale - used to color the gradients of each county based on range of values
            // of the value property
            scale: ["#ffffb2", "#b10026"],
            // use steps property to tell the number of breaks (gradients) between the min and max 
            steps: 10,
            mode: "q",
            style: {
                color: "white",
                weight: 1,
                fillOpacity: 0.75
            },
            onEachFeature: function(feature, layer){
                layer.bindPopup(`${feature.properties.NAME} <br> Population of families with children between 6-17: ${feature.properties.DP03_16E.toLocaleString()}`)
            }
        }).addTo(myMap);

    }
);