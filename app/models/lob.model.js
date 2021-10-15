const mongoose = require('mongoose');
const schema = mongoose.Schema;

let lobSchema = new schema({
  category_name:String
});

module.exports = mongoose.model('LOB', lobSchema);
