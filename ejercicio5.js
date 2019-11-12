var Twitter = require('twitter-node-client').Twitter;
var fs = require('fs');

//Clase para almacenar los tweets en el formato correcto.
class Tweet {
	constructor(autor, hora, fecha, texto){
	 this.autor=autor;
	 this.hora=hora;
	 this.fecha=fecha;
	 this.texto=texto;
	}
}
//Callback functions
var error = function (err, response, body) {
	console.log('ERROR [%s]', err);
};

var lista_tweets = new Array();

function escapeString(string) {
  return string.replace(/\n/g, " ").replace(/r/g, " ").replace(/\t/g, " ").replace(/\v/g, " ").replace(/;/g, " ").replace(/\"/g, " ").replace(/,/g, " ");
}

function sorteo(lista){
	var ganador = Math.round(Math.random()*99);
	console.log('El numero ganador fue: ', ganador+1);
	console.log('El usuario que ganador es: ', lista[ganador].autor);
}



var success = function (data) {
	tweets = JSON.parse(data);
	var i;
	for (i = 0; i < tweets.statuses.length; i++ ){
		var createdAt = new Date(tweets.statuses[i].created_at);

		var autor = tweets.statuses[i].user.name;
		var hora = createdAt.getHours().toString() + ':' + createdAt.getMinutes().toString();
		var fecha = createdAt.getDate().toString() + '/' + (createdAt.getMonth()+1).toString() + '/' + createdAt.getFullYear().toString();
		var texto = escapeString(tweets.statuses[i].text.toString());

		/** Se guarda en el array para realizar el sorteo **/
		tw_obj = new Tweet(autor, hora, fecha, texto);
  		lista_tweets.push(tw_obj);

  		/** Se guarda en un doc para verificaciones posteriores **/
		var tw = autor + ';' + hora + ';' + fecha + ';' + texto + '\n';
		if(i===0){
			fs.writeFile('tweets_sorteo.csv', tw, function(err) {
		 		if (err) throw err;
			});
		}else{
			fs.appendFile('tweets_sorteo.csv', tw, function(err) {
		 		if (err) throw err;
			});
		}	
	}
	
	/** Se realiza el sorteo y se muestra el ganador **/
	sorteo(lista_tweets);
};

//Keys de la cuenta developer
var cred = {
	"consumerKey": "S0AENDlf3pPFqqtMMBGrDYB8z",
	"consumerSecret": "t20hmQFuJ0eb6KmWcAAxaSoh3PmwjLjmii0Ttrzz3oGksSXXxv",
	"accessToken": "1186073449569144832-A3h1HusrVTjjlm29QUCIPXPMqRMN38",
	"accessTokenSecret": "rPLFcHAhxd7cwTdOFuxF3bTNd2Wftw9RvqeUV32Mhiqna",
	"callBackUrl": "https://www.pol.una.py/"
};

var twitter = new Twitter(cred);

twitter.getSearch({'q':'#sorteo','count': 100}, error, success);