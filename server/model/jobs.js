const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    plazo: {
        type:  String //debería ser DATE --> dd/mm/aaa
    },
    precio: {
        type: Number 
    },
    budgetId: {
        type: mongoose.Schema.Types.ObjectId
    },
    especialidadId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    workerId: {
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('job', jobSchema);