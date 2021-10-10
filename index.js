const express = require('express');
const app = express();
const mongoose = require('mongoose');
const si = require('systeminformation');
const config = require('./config.js');
const geneateDynamicHtml = require('./app/generate_html');
const trackCpu = require('./app/platformTimer');
const restartEvent = require('./app/restartEvent');



const port = process.env.PORT || 3001;
const DELAY = 1000;

let platform = process.platform;
let timerId = "";

 
switch(platform) {
    case 'linux': console.log("Linux Platform");
        timerId = setInterval(trackCpu.linuxOs, DELAY,{pid:process.pid});
        break;
    case 'win32': console.log("windows platform");
        trackCpu.windowOs();
        break;   
    default: console.log("unknown platform");
}

//setting a port
app.set(port);


//allowing same origin api requests...
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//handle Users api request from client...
// app.use('/api/user', require('./app/api/user_api'));
// app.use('/api/logged', require('./app/api/logged_user_api'));
// app.use('/api/apiAcess',require('./app/api/api_acess'));


app.use('/', function(req, res) {
   //load the single view file (angular will handle the page changes on the front-end)
  si.getStaticData()
      .then(function(data){
        //console.log(" info: ",data);
        res.send( geneateDynamicHtml(data));
      })
      .catch(function(error){
        console.error(error)
      });

  //res.sendFile("public/home.html",{root: __dirname });
});


app.listen(port, function(){
  console.log('Example app listening on port: '+port);
});



//Connecting to mongoDB
mongoose.connect(config.mongoDB_url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
(result) => { console.log("\n**-----------MongoDB connection established------------**\n DB:",result.name,"\n Host:",result.host,"\n Port:",result.port); },
err => { console.log("Mongo DB connection error: ",JSON.stringify(err.message)); }
);





//Track each function cpu consumption...
/* 
const inspector = require('inspector');
const session = new inspector.Session();
session.connect();

session.post('Profiler.enable', () => {

  app.use('/', function(req, res) {
    session.post('Profiler.start', () => {
      //load the single view file (angular will handle the page changes on the front-end)
      si.getStaticData().then(function(data){
        //console.log(" info: ",data);
        res.send( geneateDynamicHtml(data));
        session.post('Profiler.stop', (err, { profile }) => {
          // Write profile to disk, upload, etc.
          if (!err) {
            console.log("Performance..:", profile.endTime-profile.startTime);
          }
        });
      })
      .catch(function(error){
        console.error(error)
      });

    });
    
 
   //res.sendFile("public/home.html",{root: __dirname });
 });
 
 */


