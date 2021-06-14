const http = require('https');
const express = require('express');
var url = require('url');
const cors = require('cors');
const bodyParser = require('body-parser');

const crypto = require('crypto');

const app = express();
app.use(cors()); // Use this after the variable declaration
// Tell express to use body-parser's JSON parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.options('*', cors());

var port = process.env.PORT || 80;
app.listen(port, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));



// get requests
app.get('/webhook', (req, res) => {
    console.log('get initiated');
    // do something

});

// take in post requests
app.post('/webhook', (request, response) => {

  console.log('post request received')

  response.status(200).end();

});

