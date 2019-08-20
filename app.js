// Creating map object
var map = L.map("map", {
  center: [31.81, -103.67],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-satellite",
  accessToken: API_KEY
}).addTo(map);

// var link = "https://quake-wells.herokuapp.com/data";
// var corsLink = "https://cors-anywhere.herokuapp.com/";
var link = "../static/data/data.json";
// console.log(link);
console.log(d3.json(link));
// Grabbing our GeoJSON data..
d3.json(link).then(function (data) {
  // Creating a JSON layer with the retrieved data
  // Loop through data
  // console.log(data);
  for (var i = 0; i < data.length; i++) {

    // Set the data location property to a variable
    var lat = data[i].Lat;
    var long = data[i].Long;
    var operator = data[i].Operator;
    var apiWellNumber = data[i].API;
    var spudDate = data[i].Spud_Date;
    var prodType = data[i].Production_type;
    var gasProduction = data[i].Daily_Gas;
    var oilProduction = data[i].Daily_Oil;
    var dailyProduction = oilProduction + gasProduction / 6;
    var Reservoir = data[i].Reservoir
    var d = new Date(spudDate);
    //console.log(d.getTime());
    // Color the well depending upon whether it is Oil or Gas
    var colors = ["green", "red"];
    let color = "";
    if (prodType === "OIL") {
      color = colors[0];
    }
    else if (prodType === "GAS") {
      color = colors[1];
    }
    // Check for data
    if (dailyProduction) {
      L.circle([lat, long], {
        fillOpacity: 0.8,
        color: color,
        fillColor: color,
        // Adjust radius based on daily production
        radius: dailyProduction * 0.5

      }).bindPopup("<p>" + "API Well Number : " + apiWellNumber + "</p><hr><p>" + "Reservoir : "
      + Reservoir +"</p><hr><p>" + "Operator : "
        + operator + "</p><hr><p> Daily Oil Production : " + oilProduction +
        "(BBLS) </p><hr><p> Daily Gas Production : " +
        gasProduction + "(BOE) </p><hr><p> Spud Date : " + spudDate).addTo(map);
      // console.log(prodType);
    }
  }
// Setting up the legend from the New York City Bike project example
var legend = L.control({ position: "bottomleft" });
legend.onAdd = function () {
  var div = L.DomUtil.create("div", "info legend");
  var limits = ["Oil", "Gas"];
  var labelsColor = [];
  var labelsText = [];

  // Add min & max
  limits.forEach(function (limit, index) {
    labelsColor.push(`<li style="background-color: ${colors[index]};"></li>`); // <span class="legend-label">${limits[index]}</span>
    labelsText.push(`<span class="legend-label">${limits[index]}</span>`)
  });

  var labelsColorHtml = "<ul>" + labelsColor.join("") + "</ul>";
  var labelsTextHtml = `<div id="labels-text">${labelsText.join("<br>")}</div>`;

  var legendInfo = "<h4>Wells</h4>" +
    "<div class=\"labels\">" + labelsColorHtml + labelsTextHtml
  "</div>";
  div.innerHTML = legendInfo;

  return div;
}
legend.addTo(map);
});

