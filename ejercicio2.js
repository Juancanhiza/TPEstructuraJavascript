var fs = require('fs');

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

//for (i=1;i<lista_tweets.length;i++){
//  console.log('Tweet nro:', i, 'Autor:', lista_tweets[i].autor);
//}

//console.log(lista_tweets[0]);
var i;
for (i=1;i<lista_tweets.length;i++){
 var autor = lista_tweets[i].autor;
 //console.log(autor);
 var hora = lista_tweets[i].hora;
 var fecha = lista_tweets[i].fecha;
 var texto = lista_tweets[i].texto;
 var tw = autor + ';' + hora + ';' + fecha + ';' + texto + '\n'; 
 if(i===1){
      fs.writeFile('tweets_billetaje_ordenados.csv', tw, function(err) {
        if (err) throw err;
      });
    }else{
      fs.appendFile('tweets_billetaje_ordenados.csv', tw, function(err) {
        if (err) throw err;
      });
    }
}