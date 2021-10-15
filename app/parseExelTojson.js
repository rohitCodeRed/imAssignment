const csv = require("csvtojson");
const {parentPort, workerData} = require("worker_threads");
const mongoose = require('mongoose');
const config = require('../config');

const agentModel = require("./models/agent.model");
const carrierModel = require("./models/carrier.model");
const lobModel = require("./models/lob.model");
const policyModel = require('./models/policy.model');
const userAccModel = require('./models/user_accounts.model');
const usersModel = require('./models/users.model');

const dbInsertService = require('./services/db_insert.service');

const HEADERS =['agent','userType','policy_mode','producer','policy_number',"premium_amount_written","premium_amount","policy_type","company_name","category_name","policy_start_date","policy_end_date","csr","account_name","email","gender","firstname","city","account_type","phone","address","state","zip","dob","primary","applicant_id","agency_id","has_active_client_policy"];

//Connecting to mongoDB
mongoose.connect(config.mongoDB_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(
  (result) => { 
      //console.log("\n**-----------MongoDB by worker thread connection established------------**\n DB:","insuredmine","\n Host:","127.0.0.1","\n Port:","27017"); 
    
      csv({noheader:false,headers: HEADERS})
        .fromString(workerData.data)
        .then((result) => {
            
            _iterateAndInsert(result);
        })
        .catch((err) => {
            console.log("Error occured in csv", err);
        });
    
    },
  (err) => { console.log("Mongo DB connection error: ",JSON.stringify(err.message)); }
  );


async function _iterateAndInsert(jsonArrData){
    for(let i=0;i<jsonArrData.length;i++){
        let doc = jsonArrData[i];

        let agentQuery = {"agent":doc.agent};
        let agentId = await  dbInsertService.insert(agentQuery,agentQuery,agentModel);

        let carrierQuery ={"company_name":doc.complany_name};
        let carrierId = await dbInsertService.insert(carrierQuery,carrierQuery,carrierModel);

        let lobQuery ={"category_name":doc.category_name};
        let lobId = await dbInsertService.insert(lobQuery,lobQuery,lobModel); 
    
        let userAccQuery = {"account_name":doc.account_name};
        let userAccId = await dbInsertService.insert(userAccQuery,userAccQuery,userAccModel);

        let userQuery = {"phone":doc.phone};
        //"userType","phone","address","state","zip","email","gender","firstname","city"
        let userData = {
            "userType":doc.userType,
            "phone":doc.phone,
            "firstname":doc.firstname,
            "email":doc.email,
            "gender":doc.gender,
            "city":doc.city,
            "zip":doc.zip,
            "address":doc.address,
            "state":doc.state};
        let userId = await dbInsertService.insert(userQuery,userData,usersModel);

        let policyQuery ={"policy_number":doc.policy_number};
        let policyData = {
            "policy_number":doc.policy_number,
            "policy_start_date":doc.policy_start_date,
            "policy_end_date":doc.policy_end_date,
            "category_id":lobId,
            "company_id":carrierId,
            "user_id":userId,
            "agent_id":agentId,
            "user_account_id":userAccId};
        let policyId = await dbInsertService.insert(policyQuery,policyData,policyModel);
        
    }

    //close the mongoDB connection.. 
    mongoose.connection.close();

    //message to main function..
    parentPort.postMessage(jsonArrData.length);
    
}
