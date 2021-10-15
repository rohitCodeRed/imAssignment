const mongoose = require('mongoose');
const schema = mongoose.Schema;

//userType,"phone","address","state","zip","email","gender","firstname","city"

let usrSchema = new schema({
  firstname:String,
  dob:String,
  gender:String,
  email:String,
  userType:String,
  phone:String,
  state:String,
  zip:String,
  address:String,
  city:String 
});

module.exports = mongoose.model('user', usrSchema);
