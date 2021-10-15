const Promise = require('promise');
const services = {};

services.find = find;

function find(query,Collection){
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
