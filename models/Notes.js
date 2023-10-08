
const mongoose = require('mongoose');
const { Schema } = mongoose;

// here is the schema for uesr data for db
const notesSchema = new Schema({
    // user act like foren key wich connect the notes to the related user
    user:{
        type:mongoose.Schema.Types.ObjectId,//user data type
        ref:"User"//usr referance
    },

    title:{
        type:String,
        require:true
    },

    description:{
        type:String,
        require:true,
    },

    tag:{
        type:String,
        default:"General"
    },

    date:{
        type:Date,
        default:Date.now
    }
 
});

module.exports = mongoose.model('notes', notesSchema);