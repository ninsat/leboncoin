const leboncoin = require('leboncoin-api');
var search = new leboncoin.Search()
    .setPage(1)
    .setQuery("maison")
    .setCategory("locations")
    .setRegion("midi_pyrenees/haute_garonne")
    .addSearchExtra("mrs", 800) // min rent
    .addSearchExtra("mre", 1200) // min rent
    .addSearchExtra("ret", 1) // maison
    .addSearchExtra("ros", 5) // min room
    .addSearchExtra("sp", 0); // sort 0->date, 1->prix

console.log("exports.data = { results : [");

function format(data, page) {
    console.log("[");
    for (i in data.results) {
	console.log("{ title : \"" + data.results[i].title + "\",");
	console.log("page : '" + page + "',");
	console.log("location : \"" + data.results[i].location + "\",");
	console.log("link : '" + data.results[i].link + "',");
	console.log("price : '" + data.results[i].price + "',");
	console.log("date : '" + data.results[i].date + "',");
	console.log("images : [");
	for (img in data.results[i].images)
	    console.log("'"+data.results[i].images[img]+"',");
	console.log("]},");
    }
    console.log("],");
}

search.run().then(function (data) {
    //    console.log(data.page); // the current page
    //    console.log(data.nbResult); // the number of results for this search
    var chain = Promise.resolve();
    //    var chain = console.log("]};end");
    for (var i = 1; i <= Math.ceil(data.nbResult/35); i++) {
	//format(data);
	search.setPage(i);
	chain = function(page) { return search.run().then(function(d) { format(d,page); });}(i);
    }
    //chain = chain.then(console.log("]};end"));
}, function (err) {
    console.error(err);
});
