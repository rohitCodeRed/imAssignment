
const moment = require('moment');
const Promise = require('promise');
const collection_1 = require('../model/message_info.modal');
const collection_2 = require('../model/scheduled_message_info.modal');
const mongoose = require('mongoose');

const scheduleServices = {};

scheduleServices.scheduleMessage = scheduleMessage;


function scheduleMessage(doc){
    //TODO..
    let time_delay = _calculateDelay(doc.day,doc.time);
    setTimeout(_migrateData,time_delay,doc);

}

function _migrateData(doc){
    collection_1.find({"_id":doc._id},function(err,result){
        if(err){
          throw new Error(err.message);
        }
        else if(!result){
          throw new Error("Data not Found!");
        }
        else{
          let data = result.map((doc)=>{
            return {"message":doc.message};
          });
          let createMessage = new collection_2(data[0]);
          createMessage.save(err => {
            if (err) {
              throw new Error(err.message);
            }
            else{
              //resolve({"_id":createMessage._id,"message":createMessage.message,"day":createMessage.day,"time":createMessage.time});
            console.log("Message migrated in collection_2 with Message: ",createMessage.message);
            }
          });
        }
       });
}

function _calculateDelay(day,ptime){
    let today_date = new Date();
    let todayWeekDayNo = moment(today_date.toISOString()).isoWeekday();
    let dataWeekDayNo = _weeks(day);
    let diffDays = dataWeekDayNo - todayWeekDayNo;
    let newDate = '';
    let timeSplit = ptime.split(":");

    if(diffDays > 0){
        newDate = moment(today_date.toISOString()).add(diffDays,'days').format("YYYY-MM-DD");
    }else if(diffDays < 0){
        diffDays = (7 - todayWeekDayNo) - diffDays;
        newDate = moment(today_date.toISOString()).add(diffDays,'days').format("YYYY-MM-DD");;
    }else{
        newDate = moment(today_date.toISOString()).format("YYYY-MM-DD");
    }

    newDate = moment(newDate,'YYYY-MM-DD').add(parseInt(timeSplit[0]),'h').add(parseInt(timeSplit[1]),'m').add(parseInt(timeSplit[2]),'s').toISOString();
    // console.log("date: ",newDate);
    // console.log("date1:",today_date);
    timeDiff = moment(newDate).valueOf() - moment(today_date.toISOString()).valueOf();

    return timeDiff;

}

function _weeks(day){
    let weeks =["mon","tue","wed","thu","fri","sat","sun"]
    return weeks.indexOf(day) + 1;
}


function migrateData(){

}

module.exports = scheduleServices;