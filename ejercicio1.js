var fs = require('fs');
var Twitter = require('twitter-node-client').Twitter;

//EJERCICIO 1

var error = function (err, response, body) {
	console.log('ERROR [%s]', err);
};
var success = function (data) {
	tweets = JSON.parse(data);
	//console.log('EL archivo es: ', tweets)
	var i;
	for (i = 0; i < tweets.statuses.length; i++ ){
		//console.log('Se creo en fecha:', tweets.statuses[i].created_at);
		var usuario = tweets.statuses[i].user.name;
		var texto = tweets.statuses[i].text.replace(/\n/g, "").replace(/;/g, " ");
		var fecha_total = new Date(tweets.statuses[i].created_at);
		var dia = fecha_total.getDate();
		var mes = fecha_total.getMonth() + 1;
		var anho = fecha_total.getFullYear();
		var hora = fecha_total.getHours();
		var minutos = fecha_total.getMinutes();
		//console.log(usuario, "; ", hora,":",minutos,";")
		var tw = usuario+ ';' +hora.toString()+':'+minutos.toString()+ ';' +dia.toString()+'/'+mes.toString()+'/'+anho.toString() + ';' + texto + '\n';
		if(i==0){
			fs.writeFile('tweets_billetaje.csv', tw, function(err) {
		 		if (err) throw err;
			});
		}else{
			fs.appendFile('tweets_billetaje.csv', tw, function(err) {
		 		if (err) throw err;
			});
		}
	}

	console.log('Se leyeron exitosamente los tweets')
	//console.log('El tipo de dato es: ', typeof(tweets.statuses));
	/*
	fs.writeFile('tweets_billetaje.json', tweets, function(err) {
		if (err) throw err;
	}); 
	*/
};

var cred = {
	"consumerKey": "S0AENDlf3pPFqqtMMBGrDYB8z",
	"consumerSecret": "t20hmQFuJ0eb6KmWcAAxaSoh3PmwjLjmii0Ttrzz3oGksSXXxv",
	"accessToken": "1186073449569144832-A3h1HusrVTjjlm29QUCIPXPMqRMN38",
	"accessTokenSecret": "rPLFcHAhxd7cwTdOFuxF3bTNd2Wftw9RvqeUV32Mhiqna",
	"callBackUrl": "https://www.pol.una.py/"
};

var twitter = new Twitter(cred);

twitter.getSearch({'q':'billetaje electronico','count': 100}, error, success);