const express = require('express');
const router = express.Router();

const aggregatePolicy = require('../services/aggregate.service');

router.get('/',function(req, res) {

    aggregatePolicy.aggregate().then(function(result){
        
          //console.log(result);
          
          res.send(result);
        
      }).catch(function(err){
        res.status(400).send(err.message);
      });
  });

  


module.exports = router;