const csv = require("csvtojson");
const {parentPort, workerData} = require("worker_threads");


csv({noheader:false,
    headers: ['agent','userType','policy_mode','producer','policy_number',"premium_amount_written","premium_amount","policy_type","company_name","category_name","policy_start_date","policy_end_date","csr","account_name","email","gender","firstname","city","account_type","phone","address","state","zip","dob","primary","applicant_id","agency_id","has_active_client_policy"]})
.fromString(workerData)
.then((result) => {
    //console.log("json Data array: ",result);
    //TODO...
    parentPort.postMessage(result.length);
}).catch((err) => {
    console.log("Error occured in csv", err);
});
