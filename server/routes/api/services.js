const express = require('express')
const router = express.Router()

const serviceModel = require('../../model/services')

//TEST GET
router.get('/services/test', (req, res) => {
    res.send('services working')
})

//@GET ALL SERVICES
router.get('/services/all', (req, res) => {
serviceModel.find({})
.then(files => {
    res.send(files)
})
.catch(err => console.log(err));
});

//POST A SERVICE
router.post('/services/add', (req, res) => {
    const newService = new serviceModel({
    especialidad: req.body.especialidad,
    subespecialidades: req.body.subespecialidades
    })
    newService.save()
    .then(especialidad => {
    res.send(especialidad)
    })
    .catch(err => {
    res.status(500).send("Server error")})
    });

module.exports = router;