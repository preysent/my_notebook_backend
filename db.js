// this file for databases
require('dotenv').config()


const mongoose = require('mongoose');
const mongoURI = process.env.DB_CONNECTION_STRING

  const connectToMongoose = async() =>{
    await mongoose.connect(mongoURI);
    console.log("connected to mongo successfully")
}

module.exports = connectToMongoose;