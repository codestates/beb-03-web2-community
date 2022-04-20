const mongoose = require('mongoose');

// Define Schemes
const boardSchema = new mongoose.Schema({
  
  title : { type: String, required: true},  
  content: { type: String, required: true },
  create_date: { type: Date, default: Date.now }
},
{
  timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('board', boardSchema);