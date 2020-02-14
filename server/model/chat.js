const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({    
    jobId: {
        type: mongoose.Schema.Types.ObjectId
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    messages: {
        type: Array
    }
})

module.exports = mongoose.model('chat', chatSchema);