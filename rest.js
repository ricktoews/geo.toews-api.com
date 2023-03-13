const express = require('express');
const bodyParser = require('body-parser');
const getCountryData = require('./helpers/helpers.js');

const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());


app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get('/country-query/:countriesStr', (req, res) => {
	const countriesStr = req.params.countriesStr;

	const countries = countriesStr.split(',');

	const payload = getCountryData(countries);

	res.json({ data: payload });

});

app.post('/country-query', (req, res) => {
	const countries = req.body.countries ?? [];
	const properties = req.body.properties ?? [];

	const payload = getCountryData(countries, properties)

	res.json({ data: payload });
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});

