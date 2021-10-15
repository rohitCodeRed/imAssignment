const express = require('express');
const app = express();
const mongoose = require('mongoose');
const si = require('systeminformation');
const config = require('./config.js');
const geneateDynamicHtml = require('./app/generate_html');
const {Worker} = require("worker_threads");

const port = process.env.PORT || 3001;

//setting a port
app.set(port);


//allowing same origin api requests...
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//handle api request from client...
app.use('/api/policy', require('./app/api/policy_api'));
app.use('/api/aggregatePolicy', require('./app/api/aggregatePolicy_api'));
// app.use('/api/apiAcess',require('./app/api/api_acess'));

app.use('/', function(req, res) {

  if(req.url == "/"){
    //load the static view of server info.
    si.getStaticData()
      .then(function(data){
        //console.log(" info: ",data);
        res.send( geneateDynamicHtml(data));
      })
      .catch(function(error){
        console.error(error)
      });
  }
  else if(req.url == "/file"){
    res.sendFile("public/upload_file.html",{root: __dirname });
  }
  else if(req.url == "/api/uploadfile" && req.method =="POST"){
    var inCommingData = '';
    req.setEncoding('utf8');
    

    //Readable streams emit 'data' events once a listener is added.
    req.on('data', (chunk) => {
      inCommingData += chunk;
    });
    
    req.on('end', () => {
      try {
        //console.log("data",inCommingData);
        let data = inCommingData;
        const worker = new Worker("./app/parseExelTojson.js", {workerData:{"data":data}});
        
        //Listen for a message from worker
        worker.once("message", result => {
          console.log(`Worker thread completed the task with json length: ${result}`);
        });

        worker.on("error", error => {
          console.log("Error occured in worker.",error);
        });

        worker.on('exit', (code) => {
          if (code !== 0)
            console.log(`Worker stopped with exit code ${code}`);
        });
        // Write back to the user:
        res.sendFile("public/upload_complete.html",{root: __dirname });
      } catch (er) {
        // uh oh! bad json!
        res.statusCode = 400;
        return res.end(`error: ${er.message}`);
      }
    });
    
  }
  
});

app.listen(port, function(){
  console.log('Example app listening on port: '+port);
});



//Connecting to mongoDB
mongoose.connect(config.mongoDB_url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
(result) => { console.log("\n**-----------MongoDB connection established------------**\n DB:","insuredmine","\n Host:","127.0.0.1","\n Port:","27017"); },
err => { console.log("Mongo DB connection error: ",JSON.stringify(err.message)); }
);
