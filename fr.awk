#!/bin/awk -f
BEGIN { FS=";"; }
{
    nom=$9;
    zip=$10;
    lat=($12 != "") ? $12 : 0.0;
    lon=($13 != "") ? $13 : 0.0;
    if (zip == "codes_postaux")
	print "exports.villes = {";
    else
	if (zip >= 31000 && zip < 32000)
	    print "\""nom"\" : { code: \""zip"\", lat: \""lat"\", long: \""lon"\" },";}
END {print "}"}
