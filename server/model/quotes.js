const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    },
    data: {
        type: String
    },
    plazo : {
        type: String //debería ser DATE --> dd/mm/aaa
    },
    direccion : {
        type: String 
    },
    barrio : {
        type: String 
    },
    telefono : {
        type: String 
    },
    email : {
        type: String 
    },
    especialidadId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true
    }
})

module.exports = mongoose.model('quote', quoteSchema)