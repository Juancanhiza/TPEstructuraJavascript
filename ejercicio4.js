var TwitterStream = require('twitter-stream-api'),
    fs = require('fs');

var keys = {
  consumer_key: "S0AENDlf3pPFqqtMMBGrDYB8z",
  consumer_secret: "t20hmQFuJ0eb6KmWcAAxaSoh3PmwjLjmii0Ttrzz3oGksSXXxv",
  token: "1186073449569144832-A3h1HusrVTjjlm29QUCIPXPMqRMN38",
  token_secret: "rPLFcHAhxd7cwTdOFuxF3bTNd2Wftw9RvqeUV32Mhiqna"
};

var Twitter = new TwitterStream(keys, false);

Twitter.on('connection success', function(uri) {
    console.log('connection success', uri);
});

Twitter.on('connection error network', function(error) {
    console.log('connection error network', error);
});

Twitter.stream('statuses/filter', {
    track: '#cryptocurrencynews'
});

function escapeString(string) {
  return string.replace(/\n/g, " ").replace(/r/g, " ").replace(/\t/g, " ").replace(/\v/g, " ").replace(/;/g, " ").replace(/\"/g, " ").replace(/,/g, " ");
}

Twitter.on('data', (data) => {
	var tweet = JSON.parse(data.toString());
	var createdAt = new Date(tweet.created_at);
	
	var autor = tweet.user.name;
	var hora = createdAt.getHours().toString() + ':' + createdAt.getMinutes().toString();
	var fecha = createdAt.getDate().toString() + '/' + (createdAt.getMonth()+1).toString() + '/' + createdAt.getFullYear().toString();
	var texto = escapeString(tweet.text.toString());
	
	var tw = autor + ';' + hora + ';' + fecha + ';' + texto + '\n';
	console.log(tw)
	fs.appendFileSync('tweets_tiempo_real.csv', tw);
});
 
//Twitter.pipe(fs.createWriteStream('tweets.json'));