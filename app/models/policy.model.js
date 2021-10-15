const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

let policySchema = new schema({
  //{type:String,default:crypto.randomBytes(16).toString('hex')},
  policy_number:String,
  policy_start_date:String,
  policy_end_date:String,
  category_id:schema.ObjectId,
  company_id:schema.ObjectId,
  user_id:schema.ObjectId,
  agent_id:schema.ObjectId,
  user_account_id:schema.ObjectId
});

module.exports = mongoose.model('policies', policySchema);
