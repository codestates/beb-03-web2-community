const mongoose = require('mongoose');
var autoNumber = require('mongoose-auto-number');
autoNumber.init(mongoose.connection);

// Define Schemes
const boardSchema = new mongoose.Schema({
  
  title : { type: String, required: true},  
  content: { type: String, required: true },
  userEmail: { type: String, required: true},
  userName: { type: String, required: true},
  board_id: {
    type: Number,
    autoIncrement: true    
},
},
{ 
  timestamps: true
});

boardSchema.plugin(autoNumber.plugin, 'board');
// Create Model & Export
module.exports = mongoose.model('board', boardSchema);