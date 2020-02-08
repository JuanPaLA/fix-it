const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    // plazo: {
    //     type:  String //debería ser DATE --> dd/mm/aaa
    // },
    // especialidadId: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    // precio: {
    //     type: Number 
    // },
    // descripcion: {
    //     type: String 
    // },
    quoteId: {
        type: mongoose.Schema.Types.ObjectId
    },
    budgetId: {
        type: mongoose.Schema.Types.ObjectId
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    // workerId: {
    //     type: mongoose.Schema.Types.ObjectId
    // }
})

module.exports = mongoose.model('job', jobSchema);