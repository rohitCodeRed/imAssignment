const mongoose = require('mongoose');
const schema = mongoose.Schema;

let agentSchema = new schema({
  agent:String
});

module.exports = mongoose.model('Agents', agentSchema);
