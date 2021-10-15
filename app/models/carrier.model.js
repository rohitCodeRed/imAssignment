const mongoose = require('mongoose');
const schema = mongoose.Schema;

let carierSchema = new schema({
  company_name:String
});

module.exports = mongoose.model('Carriers', carierSchema);
