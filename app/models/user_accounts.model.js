const mongoose = require('mongoose');
const schema = mongoose.Schema;

let usrAcntSchema = new schema({
  account_name:String
});

module.exports = mongoose.model('user_accounts', usrAcntSchema);
