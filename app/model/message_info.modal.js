const mongoose = require('mongoose');
const schema = mongoose.Schema;

var collSchema = new schema({
  //{type:String,default:crypto.randomBytes(16).toString('hex')},
  message:{
    type:String,
    required:[true,"Message required."]},
  day:{
      type:String,
      enum:["mon","tue","wed","thu","fri","sat","sun"],
      required:[true,"Week day required."]
  },
  time:{
      type:String,
      validate: {
        validator: function(v) {
          return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(v);
        },
        message: props => `${props.value} is not a valid time format!`
      }}
});

//var customer = mongoose.model('customer', userSchema);
module.exports = mongoose.model('collection_1', collSchema);
