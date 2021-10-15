const express = require('express');
const router = express.Router();

const policyModel = require('../models/policy.model');
const usersModel = require('../models/users.model');

const findService = require('../services/find.service');
const findOneService = require('../services/findOne.service');


router.get('/',function(req, res) {

    let queryParams = req.query;
    if(!queryParams.hasOwnProperty('username')){
        res.status(400).send("username parameter is missing in query.");
    }

    try {
        getPolicy(queryParams,res);
    } catch (error) {
        res.status(400).send(err.message);
    }
  
  });


  async function getPolicy(queryParams,res){

        let userData = await findOneService.findOne({"firstname":queryParams.username},usersModel);

        let policyData = await findService.find({"user_id":userData._id},policyModel);

        res.send(policyData);

  }



module.exports = router;