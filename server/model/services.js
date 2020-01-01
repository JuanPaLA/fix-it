const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    especialidad: {
        type: String,
        required: true
    },
    subespecialidades: {
        type: Array
    }     
})

module.exports = mongoose.model('service', serviceSchema)