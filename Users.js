const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create User Schema
const UserSchema = new Schema ({
    count : {
        type : Number,
        required : true
    },   
    ip : {
        type : String,
        required : true
    }
});

module.exports = User = mongoose.model('Visitors', UserSchema);