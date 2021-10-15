const Promise = require('promise');
const Collection = require('../models/lob.model');
const services = {};

services.find = findByQuery;

function findByQuery(query){
  let findPromise = new Promise((resolve,reject)=>{

    Collection.find(query,function(err,result){
        if(err){
          reject(new Error(err.message));
        }
        else{
          resolve(result);
        }
       });
    

  });

  return findPromise;
}



module.exports = services;
