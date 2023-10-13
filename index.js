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

// post request
app.post('/webhook', (request, response) => {
    //new code
  // Check to see POST request was received
  console.log('request recieved');
  console.log(request.body);

  // // Make request to create a task
  req.write(JSON.stringify({"data": {"name":"My Asana Ticket","workspace": "1166215194457895"} }));
  req.end();

 
  response.status(200).end();

});

//initialize task data
var taskdata;
var asanatask;
var gid; //task gid

// Task creation POST request body
var options = {
  "method": "POST",
  "hostname": "app.asana.com",
  "port": null,
  "path": "/api/1.0/tasks",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer 1/1201342411195482:bce912d26cfb398b1439ae383123bc6c",
    "Accept": "application/json"
  }
};

// Assign Project to task POST request body
var options2;



// initialize function to send a POST request to create a task in asana
const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
  const body = Buffer.concat(chunks);
  taskdata = body.toString();
  asanatask = JSON.parse(taskdata);
  // grab gid of the task that was created
  console.log(asanatask.data.gid);
  // save gid of task that was created
  gid = asanatask.data.gid;
  options2 = {
    "method": "POST",
    "hostname": "app.asana.com",
    "port": null,
    "path": `/api/1.0/tasks/${gid}/addProject`,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer 1/1201342411195482:bce912d26cfb398b1439ae383123bc6c",
      "Accept": "application/json"
    }
  };
  // initialize function to send a POST request to link a task to a project in asana
  const req2 = http.request(options2, function (res2) {
    const chunks2 = [];

    res2.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res2.on("end", function () {
    const body2 = Buffer.concat(chunks);
    console.log(body2.toString());
    });
  
  });
  
  // Sync project to task that was created
  req2.write(JSON.stringify({"data": {"project":"1201342620375894"}}));
  req2.end();

  });

});