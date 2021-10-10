
const Promise = require('promise');
const collection_1 = require('../model/message_info.modal');
const messageServices = {};
const mongoose = require('mongoose');

messageServices.insertMessage = insertMessage;


function insertMessage(data){
  let messagePromise = new Promise((resolve,reject)=>{
        let createMessage = new collection_1(data);
        createMessage.save(err => {
          if (err) {
            reject(new Error(err.message));
          }
          else{
            resolve({"_id":createMessage._id,"message":createMessage.message,"day":createMessage.day,"time":createMessage.time});
          }
        });
      
  });

  return messagePromise;
}



module.exports = messageServices;
