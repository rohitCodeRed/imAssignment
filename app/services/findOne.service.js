const Promise = require('promise');
const services = {};

services.findOne = findOne;

function findOne(query,Collection){
  let findPromise = new Promise((resolve,reject)=>{

    Collection.findOne(query,function(err,result){
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
