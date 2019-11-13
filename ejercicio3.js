//Ejercicio 3
var fs = require('fs');
var Twitter = require('twitter-node-client').Twitter;
var lista_tweets = new Array();

class Tweet {
  constructor(autor, hora, fecha, texto){
   this.autor=autor;
   this.hora=hora;
   this.fecha=fecha;
   this.texto=texto;
  }
}

var texto = fs.readFileSync('tweets_billetaje_ordenados.csv');
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

var mayor_apariciones = 0;
var apariciones = 0;
var anterior = lista_tweets[1].autor.toString();
//console.log(anterior);
var autor_mayor = anterior;
var i;

 for (i=0;i<lista_tweets.length;i++){
   console.log('Tweet nro:', i, 'Autor:', lista_tweets[i].autor);
 }

for (i=1; i<lista_tweets.length-1; i++){
    actual = lista_tweets[i].autor.toString();
    if (anterior === actual){
      apariciones++;
    }else{
      console.log('- El usuario: ' + anterior + ' tiene ' + apariciones + ' tweets')
      if (apariciones>mayor_apariciones){
          mayor_apariciones = apariciones
          autor_mayor = anterior
      }
      apariciones = 1
    }
    anterior=actual
}
console.log('+ El usuario que más twiteó fue:', autor_mayor, ' con un total de:', mayor_apariciones, ' tweets.')