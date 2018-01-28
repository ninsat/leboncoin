const leboncoin = require('leboncoin-api');
var search = new leboncoin.Search()
    .setPage(0)
    .setQuery("maison")
    .setCategory("locations")
    .setRegion("midi_pyrenees/haute_garonne")
    .addSearchExtra("mrs", 800) // min rent
    .addSearchExtra("mre", 1200) // min rent
    .addSearchExtra("ret", 1) // maison
    .addSearchExtra("ros", 5) // min room
    .addSearchExtra("sp", 0); // sort 0->date, 1->prix

console.log("exports.data = { results : [");

search.run().then(function (data) {
//    console.log(data.page); // the current page
//    console.log(data.nbResult); // the number of results for this search

//    Item {
//  title: 'Villa 5 pièces 110 m²',
//  category: '',
//  link: '//www.leboncoin.fr/locations/1373415348.htm?ca=16_s',
//  images:
//   [ 'https://img3.leboncoin.fr/ad-thumb/0f50fed60c9708bde5dbdcd12c1aca0b21bd4048.jpg' ],
//  location: 'Colomiers /  Haute-Garonne',
//  urgent: false,
//  price: 1180,
//  date: 2018-01-23T08:02:00.670Z,
//  id: 1373415348 }

    for (i in data.results) {
	console.log("{ title : '" + data.results[i].title + "',");
	console.log("location : '" + data.results[i].location + "',");
	console.log("link : '" + data.results[i].link + "',");
	console.log("price : '" + data.results[i].price + "',");
	console.log("date : '" + data.results[i].date + "',");
	console.log("images : [");
	for (img in data.results[i].images)
	    console.log("'"+data.results[i].images[img]+"',");
	console.log("]},");
    }
    console.log("]}");
    //console.log(data.results); // the array of results
    //console.log(data.results[0]['location']);
    //    data.results[0].getDetails().then(function (details) {
//        console.log(details); // the item 0 with more data such as description, all images, author, ...
//    }, function (err) {
//        console.error(err);
//    });
//    data.results[0].getPhoneNumber().then(function (phoneNumer) {
//        console.log(phoneNumer); // the phone number of the author if available
//    }, function (err) {
//        console.error(err); // if the phone number is not available or not parsable (image -> string)
//    });
}, function (err) {
    console.error(err);
});
