const mongoose = require('mongoose');
const schema = mongoose.Schema;

let policySchema = new schema({
  //{type:String,default:crypto.randomBytes(16).toString('hex')},
  policy_number:String,
  policy_start_date:String,
  policy_end_date:String,
  category_id:String,
  company_id:String,
  user_id:String,
  agent_id:String,
  user_account_id:String
});

module.exports = mongoose.model('policies', policySchema);
