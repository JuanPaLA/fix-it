const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema ({
    userName: {
        type: String
    },
    email: {
        type: String,  
    },
    password: {
        type: String     
    },
    country : {
        type: String
    }
});

module.exports = User = mongoose.model('user', UserSchema)