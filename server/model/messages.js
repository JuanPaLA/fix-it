const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    
    date: {
        type: Date,
        default: Date.now()
    },
    emiter: {
        type: mongoose.Schema.Types.ObjectId,
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    message: {
        type: String
    },
    
})

module.exports = mongoose.model('message', messageSchema);