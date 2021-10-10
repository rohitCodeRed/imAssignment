const mongoose = require('mongoose');
const schema = mongoose.Schema;

let collSchema = new schema({
  //{type:String,default:crypto.randomBytes(16).toString('hex')},
  message:String,
  onCreated:{ type: Date, default: Date.now }
});

//var customer = mongoose.model('customer', userSchema);
module.exports = mongoose.model('collection_2', collSchema);
