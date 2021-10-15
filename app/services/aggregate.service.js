const Promise = require('promise');
//const policyModel = require('../models/policy.model');
const userModel = require('../models/users.model');
const services = {};

services.aggregate = aggregate;

function aggregate(){
  let aggregatePromise = new Promise((resolve,reject)=>{

    userModel.aggregate([{
        $lookup:
           {
             from: "policies",
             let: { id: "$_id"},
             pipeline: [
                { $match:
                    { "$expr": { "$eq": ["$user_id", "$$id"] }}
                },
                { $project: { _id: 0,user_id:0 } }
             ],
             as: "policies"
           }
      }
  ],function(err,result){
        if(err){
          reject(new Error(err.message));
        }
        else{
          resolve(result);
        }
       });
    

  });

  return aggregatePromise;
}



module.exports = services;
