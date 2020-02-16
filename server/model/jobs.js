const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    precio: {
        type: Number 
    },
    titulo: {
        type: String 
    },
    quoteId: {
        type: mongoose.Schema.Types.ObjectId
    },
    budgetId: {
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

module.exports = mongoose.model('job', jobSchema);