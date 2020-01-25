const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema ({
    userName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true        
    },
    password: {
        type: String,
        required: true     
    },
    rol : {
        type: String
    }
});

module.exports = User = mongoose.model('user', UserSchema)