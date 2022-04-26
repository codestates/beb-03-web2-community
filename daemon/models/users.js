const mongoose = require('mongoose');

// Define Schemes
const usersSchema = new mongoose.Schema({
  
  userEmail : { type: String, required: true },
  userName : { type: String, required: true },  
  password: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  balance: { type: Number, default: 0 },
  create_date: { type: Date, default: Date.now },
  privateKey: { type: String, required: true }
},
{
  timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('users', usersSchema);