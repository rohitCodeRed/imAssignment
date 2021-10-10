const express = require('express');
const router = express.Router();
const messageService = require('../service/message.service');
const scheduleService = require('../service/schedule_message.service');


router.post('/insert',function(req, res) {
    messageService.insertMessage(req.body).then(function(result){
        if(result){
            console.log(result);

            scheduleService.scheduleMessage(result);
            res.send({"status":"success","data":result});
          }else{
            res.status(400).send("Unable to insrt message.");
          }
    }).catch(function(err){
        res.status(400).send(err.message);
      });
    

});

module.exports = router;
