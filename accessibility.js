'use strict';
var fs = require('fs')
var async = require('async');
var pa11y = require('pa11y');
var csvReporter= require('./csv.js');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var Promise = require('bluebird');
var urlArray=[];
var test = pa11y();
var resultArray = [];

function pallyCrawler(url){
	return new Promise(function(resolve, reject) {
		test.run(url, function(error, results) {
			if (error) {
				console.error(error.message);
				return reject(error.message);
			}
			if(results) {
				results.forEach(function(result) {
					result.url = url;
					if(result.type.toLowerCase() == 'error') {
						resultArray.push(result);
					}
				});
			}
			return resolve();
		});
	});	
}

module.exports = function(){
	return new Promise(function(resolve,reject){
	fs.readFile('uploads/sitemap.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
    	resultArray = [];
        var promiseArray=[]
        var index;        
        result.urlset.url.forEach(function(url){
        	promiseArray.push(pallyCrawler(url.loc.toString()));
        });  		
  		Promise.all(promiseArray)
  		.then(function(results){
			var results_csv=csvReporter.process(resultArray);
			fs.writeFileSync('download/report.csv', results_csv);
			return resolve();
  		})
  		.catch(function(err){
  			return reject(err);
  		});	
    });
})
}) 
}



