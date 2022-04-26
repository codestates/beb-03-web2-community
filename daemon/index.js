const myWeb3= require('./myWeb3');
const mongoose = require('mongoose');
require('dotenv').config();
const {USER_NAME, USER_PASSWORD, CLOUD_NAME, DATABASE_NAME } = process.env;
const MONGO_URI = `mongodb+srv://${USER_NAME}:${USER_PASSWORD}@${CLOUD_NAME}.ej0vx.mongodb.net/${DATABASE_NAME}`

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('MongoDB connected...')
    
})
.catch(error => console.log(error));

myWeb3.getLastestTransactions();   

//