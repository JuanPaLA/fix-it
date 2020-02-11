const express = require('express')
const router = express.Router()
var cors = require('cors');
router.use(cors())

const jobModel = require('../../model/jobs');
const budgetModel = require('../../model/budgets');

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
    const newJob = new jobModel({
        precio: req.body.precio,
        quoteId: req.body.quoteId,
        budgetId: req.body.budgetId,
        userId: req.body.userId,
        titulo: req.body.titulo,
        workerId: req.body.workerId
    })
    newJob.save()
    .then(job => 
        res.json(job))
    .catch(err => {
        res.status(500).send("Server error on jobs")
    })    
})


//@GET JOB BY ID
router.get('/jobs/get/:id', (req, res) => {
    jobModel.findById({_id: req.params.id})
    .then(job => res.json(job))
});


//GET JOB BY USER-ID
router.get('/jobs/user/:userId', (req, res) => {
    jobModel.find({ userId: req.params.userId})
    .then(job => res.json(job))
    .catch(err => console.log("error gettting jobs by userId"))
})
module.exports = router;