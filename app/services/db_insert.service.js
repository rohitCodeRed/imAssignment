const Promise = require('promise');
const services = {};

services.insert = dupCheckAndInsert;

function dupCheckAndInsert(query,data,collectionModel){
 let promiseId = new Promise((resolve,reject)=>{
   
    collectionModel.findOne(query,function(err,result){
     if(err){
       reject(new Error(err.message));
     }
     else if(!result){
        _insert(data,collectionModel).then((id)=> {
            resolve(id);
        });
     }
     else{
        resolve(result._id);
     }
    });
 });

 return promiseId;
}

function _insert(data,collectionModel){
    let insertPromise = new Promise((resolve,reject)=>{
          let createData = new collectionModel(data);
          createData.save(err => {
            if (err) {
              reject(new Error(err.message));
            }
            else{
              resolve(createData._id);
            }
          });
    });
    return insertPromise;
  }


module.exports = services;
