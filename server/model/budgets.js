const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    // especialidadId: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    titulo: {
        type:  String 
    },
    estado: { //agregar a reduX y acciones e interfaz
        type: Boolean,
        default: true 
    },
    precio: {
        type: Number 
    },
    mensaje: {
        type: String 
    },
    quoteId: {
        type: mongoose.Schema.Types.ObjectId
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    workerId: {
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('budget', budgetSchema);