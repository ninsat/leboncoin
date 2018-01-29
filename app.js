var L = require('leaflet');
const hg = require('./haute_garonne');
const data = require('./out').data;

function around(x) {
    return Math.round((Number(x) + Math.random() * 0.01 - 0.005)*10000000)/10000000;
}

var page = {};
for (var i in data.results) {
    for (var j in data.results[i]) {
	var d = data.results[i][j];
	var v = d.location.split(' / ')[0];
	if (v in hg.villes) {
	    var date = new Date(d.date);
	    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	    var m = L.marker([around(hg.villes[v].lat), around(hg.villes[v].long)]).bindPopup(
		'<b>' + v + ':</b>' +
		    '<a href="http:' + d.link + '">' + d.title + '</a>' +
		    '</br>' +
		    d.price + '€' +
		    '</br>' +
		    '<a href="http:' + d.link + '">' + '<img src="' + d.images[0] + '">' + '</a>' +
		    '</br>' +
		    date.toLocaleDateString('fr-FR', options)
	    );
	    if (!(d.page in page))
		page[d.page] = [m];
	    else
		page[d.page].push(m);
	}
    }
}

// Initialize the map
var map = L.map('map', {
  scrollWheelZoom: false
});

// Set the position and zoom level of the map
// Toulouse
map.setView([hg.villes["Toulouse"].lat, hg.villes["Toulouse"].long], 10);

// Initialize the base layer
var osm_mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var base = {
	"OSM": osm_mapnik
};

var overlays = {};
for (k in page) {
    overlays["page " + k] = L.layerGroup(page[k]).addTo(map);
}

// Add baseLayers and overlays to layer panel
L.control.layers(base, overlays).addTo(map);
