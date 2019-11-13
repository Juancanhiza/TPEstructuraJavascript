var fs = require('fs');

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
		fs.appendFile('tweets_billetaje.csv', tw, function(err) {
		 if (err) throw err;
		});
	}
	//console.log('El tipo de dato es: ', typeof(tweets.statuses));
	/*
	fs.writeFile('tweets_billetaje.json', tweets, function(err) {
		if (err) throw err;
	}); 
	*/
};

var Twitter = require('twitter-node-client').Twitter;


var cred = {
	"consumerKey": "S0AENDlf3pPFqqtMMBGrDYB8z",
	"consumerSecret": "t20hmQFuJ0eb6KmWcAAxaSoh3PmwjLjmii0Ttrzz3oGksSXXxv",
	"accessToken": "1186073449569144832-A3h1HusrVTjjlm29QUCIPXPMqRMN38",
	"accessTokenSecret": "rPLFcHAhxd7cwTdOFuxF3bTNd2Wftw9RvqeUV32Mhiqna",
	"callBackUrl": "https://www.pol.una.py/"
};

var twitter = new Twitter(cred);

//twitter.getSearch({'q':'billetaje electronico','count': 100}, error, success);

// EJERCICIO 2

function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)].autor.toString().toUpperCase(), //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i].autor.toString().toUpperCase() < pivot) {
            i++;
        }
        while (items[j].autor.toString().toUpperCase() > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //swap two elements
            i++;
            j--;
        }
    }
    return i;
}

function quicksort_tweets(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quicksort_tweets(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quicksort_tweets(items, index, right);
        }
    }
    return items;
}

class Tweet {
	constructor(autor, hora, fecha, texto){
	 this.autor=autor;
	 this.hora=hora;
	 this.fecha=fecha;
	 this.texto=texto;
	}
}

var lista_tweets = new Array();

var texto = fs.readFileSync('tweets_billetaje.csv');
var texto_por_linea = texto.toString().split('\n');

texto_por_linea.forEach( linea => {
  partes = linea.toString().split(';');
  autor = partes[0];
  hora = partes[1];
  fecha = partes[2];
  texto = partes[3];
  tw = new Tweet(autor, hora, fecha, texto);
  lista_tweets.push(tw);
});

 // for (i=0;i<lista_tweets.length;i++){
 //   console.log('Tweet nro:', i, 'Autor:', lista_tweets[i].autor);
 // }

quicksort_tweets(lista_tweets, 0, lista_tweets.length-1);

for (i=0;i<lista_tweets.length;i++){
  console.log('Tweet nro:', i, 'Autor:', lista_tweets[i].autor);
}

//console.log(lista_tweets[0]);
var i;
for (i=1;i<lista_tweets.length;i++){
 var autor = lista_tweets[i].autor;
 //console.log(autor);
 var hora = lista_tweets[i].hora;
 var fecha = lista_tweets[i].fecha;
 var texto = lista_tweets[i].texto;
 var tw = autor + ';' + hora + ';' + fecha + ';' + texto + '\n';
 fs.appendFile('tweets_billetaje_ordenados.csv', tw, function(err) {
   if (err) throw err;
 });
}

//Ejercicio 3

var mayor_apariciones = 0;
var apariciones = 0;
var anterior = lista_tweets[1].autor.toString();
//console.log(anterior);
var autor_mayor = anterior;
var i;

for (i=1; i<lista_tweets.length; i++){
    actual = lista_tweets[i].autor.toString();
    if (anterior === actual){
      apariciones++;
    }else{
      if (apariciones>mayor_apariciones){
          mayor_apariciones = apariciones
          autor_mayor = anterior
      }
      apariciones = 1
    }
    anterior=actual
}
console.log('El usuario que más twiteó fue:', autor_mayor, ' con un total de:', mayor_apariciones, ' tweets.')


// const lector = readline.createInterface({
//   input: fs.createReadStream('tweets_billetaje.csv')
// });

// lector.on('line', linea => {
// 	  //console.log("Tenemos una línea:", linea);
//   partes = linea.split(';');
//   autor = partes[0];
//   hora = partes[1];
//   fecha = partes[2];
//   texto = partes[3];
//   tw = new Tweet(autor, hora, fecha, texto);
//   //console.log(tw)
//   lista_tweets.push(tw);
//  });

// lector.on('close', () => {
//   //console.log(lista_tweets);
//   quicksort_tweets(lista_tweets, 0, lista_tweets.length-1);
//   var i;
//   for (i=0;i<lista_tweets.length;i++){
//   	var autor = lista_tweets[i].autor;
//   	var hora = lista_tweets[i].hora;
//   	var fecha = lista_tweets[i].fecha;
//   	var texto = lista_tweets[i].texto;
//   	var tw = autor + ';' + hora + ';' + fecha + ';' + texto + '\n';
//   	fs.appendFile('tweets_billetaje_ordenados.csv', tw, function(err) {
// 	    if (err) throw err;
// 	  });
//   }