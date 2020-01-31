const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema ({
    userName: {
        type: String,
        required: true        
    },
    email: {
        type: String,
        required: true        
    },
    password: {
        type: String,
        required: true     
    },
    rol : {
        type: String,
        // required: true  // falta implementar en el front      
    },
    date: {
        type: Date,
        default: Date.now
      }
});

module.exports = User = mongoose.model('user', UserSchema)