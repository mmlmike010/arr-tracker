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
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));



// get requests
app.get('/webhook', (req, res) => {
    console.log('get initiated');
    // do something

});

// take in post requests
app.post('/webhook', (request, response) => {
    
  // Check to see POST request was received
  console.log('request recieved');

  // Start of POST request to FH
  var options = {
    "method": "POST",
    "hostname": "api.firehydrant.io",
    "port": null,
    "path": "/v1/incidents",
    "headers": {
    "content-type": "application/json",
    "authorization": "fhb-61cb8cc3a30ecaada06273dffe034a5c"
    }
  };
  
  var req = http.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  
  // POST data to be sent to FH
  req.write(JSON.stringify({
    name: request.body.messages[0].incident.title,
    summary: request.body.messages[0].incident.description,
    severity: 'SEV1',
    severity_condition_id: 'string',
    severity_impact_id: 'string',
    alert_ids: ['string'],
    labels: {}
  }));
  req.end();



  response.status(200).end();

});

