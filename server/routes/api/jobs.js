const express = require('express')
const router = express.Router()

const jobModel = require('../../model/jobs');

//@GET QUOTES
router.get('/jobs/all', (req, res) => {
    jobModel.find({})
    .then(files => {
        res.send(files)
    })
    .catch(err => console.log(err));
});

//@POST QUOTE
router.post('/jobs/add', (req, res) => {
    const newQuote = new jobModel({
        descripcion: req.body.descripcion,
        data: req.body.data,
        plazo: req.body.plazo,
        direccion: req.body.direccion,
        barrio: req.body.barrio,
        telefono: req.body.telefono,
        email: req.body.email,
        especialidadId: req.body.especialidadId,
        userId: req.body.userId,
    })
    newQuote.save().then(job => res.json(job))
    .catch(err => {
        res.status(500).send("Server error on jobs")
    })
})

module.exports = router;