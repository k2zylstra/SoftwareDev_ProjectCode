/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
**********************/
const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'weatherdb',
	user: 'postgres',
	password: 'help' //modidfy this line  to the password you set on the database.
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory


var pg = require('pg');
var apiKey_hour = "xGXPt0sqTAIT7mQ1HZOsywWhRYhwfHFn";


//var ret = client.query("select * from daily_weather");

var http = require("http");

//url_hourly = pro.openweathermap.org/data/2.5/forecast/hourly?id={city ID}&appid={your api key} 
url_hourly = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/16834?apikey=" + apiKey_hour;
var apiKey = "6adef049dd8abe2d9aac6577b7a20f93";
var conStr = "postgres://postgres:help@localhost:5432/weatherdb";//modify this line to the password you set in the database
url = "http://api.openweathermap.org/data/2.5/weather?q=boulder,colorado&units=imperial&appid=" + apiKey;



function insertDailyWeather(url, conStr) {

	var client = new pg.Client(conStr);
	client.connect();
	console.log("Hello testing");

	var request = http.get(url, function (response) {

		var buffer = "",
			data;
		response.on("data", function (chunk) {
			buffer += chunk;
		});

		response.on("end", function (err) {

			//console.log(buffer);
			//console.log("\n");
			data = JSON.parse(buffer);

			var date = new Date();
			var temp_f_high = data.main.temp_max;
			var temp_c_high = (temp_f_high - 32) * (9 / 5);
			var temp_f_low = data.main.temp_min;
			var temp_c_low = (temp_c_low - 32) * (9 / 5);

			var humidity = data.main.humidity;
			var precipitation = data.weather[0]["main"];
			var wind = data.wind["speed"];
			var feels_like = data.main.feels_like;
			var pressure = data.main.pressure;
			var description = data.weather["description"];
			debugger
			//console.log(data);

			client.query("INSERT INTO Daily_Weather(day, temp_f_high, temp_f_low, temp_c_high, temp_c_low, humidity, precipitation, coverage, alerts, feels_like, pressure, wind, description, precip_chance) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
				[
					date
					, temp_f_high
					, temp_c_high
					, temp_f_low
					, temp_c_low
					, humidity
					, precipitation
					, null
					, null
					, feels_like
					, pressure
					, wind
					, description
					, null
				]).then(() => { client.end() })
				.catch(function (err) {
					// display error message in case an error
					console.log('error', err);
				});
		})
	});
}

var query_today = "select * from Daily_Weather where day = cast(to_char(now(), 'YYYY-MM-DD') as date)";
var client = new pg.Client(conStr);
client.connect()
client.query(query_today)
	.then((today) => {
		console.log("today length: ", today.rows.length);
		if (today.rows.length === 0) {
			insertDailyWeather(url, conStr);
		}
		console.log("today: ", today.day);
	})
	.then(() => {
		client.end();
	});

setInterval(function () {
	insertDailyWeather(url, conStr);
}, 86400000); //8640000 is 24 hours in milliseconds 1000 * 60 * 60 * 24

app.get('/frontpage', function (req, res) {
	var query = 'select * from daily_weather;';
	var query2='select * from hour_weather;';
	db.task('get-everything',task=> {
		return task.batch([
			task.any(query),
			task.any(query2)

		]);
	})
	.then(data=> {
		res.render('pages/frontpage',{
			my_title: "Front Page",
			dayWeather: data[0],
			hourWeather: data[1]
		})
	})
	.catch(function (err) {
            // display error message in case an error
            console.log('error', err);
            res.render('pages/frontpage', {
                title: 'Front Page',
                dayWeather: 'dayWeather failed',
                hourWeather: 'hourWeather failed'
            })
		})
});

app.get('/futurepage', function (req, res) {
	res.render('pages/futurepage', {
		local_css: "futurepage.css",
		my_title: "Future weather"
	});
});
app.get('/previouspage', function (req, res) {
	res.render('pages/previouspage', {
		local_css: "previouspage.css",
		my_title: "Previous weather"
	});
});
app.get('/aboutus', function (req, res) {
	res.render('pages/aboutus', {
		local_css: "aboutus.css",
		my_title: "About Us"
	});
});
app.get('/statistics', function (req, res) {
	var query = "select * from daily_weather where day = cast(to_char(now(), 'YYYY-MM-DD') as date)";
	db.any(query)
		.then(function (weather_data) {

			//console.log(weather_data);
			res.render('pages/statistics', {
				local_css: "statistics.css",
				my_title: "Statistics",
				weather: weather_data,
				user: "test"
			});
		}
		)
});


app.listen(3000);
console.log('3000 is the magic port');
