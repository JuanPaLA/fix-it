const express = require('express')
const router = express.Router()
var cors = require('cors');
router.use(cors())

const budgetModel = require('../../model/budgets');

//GET budgets
router.get('/budgets/all', (req, res) => {
    budgetModel.find({})
    .then(files => {
        res.send(files)
    })
    .catch(err => console.log('error geting all budgets'))
});

//POST budget
router.post('/budgets/add', (req, res) => {
    console.log(req.body)
    const newBudget = new budgetModel({
        especialidadId: req.body.especialidadId,
        workerId: req.body.workerId,
        userId: req.body.userId,
        precio: req.body.precio,
        plazo: req.body.plazo,
        quoteId: req.body.quoteId,
        mensaje: req.body.mensaje
    })
    newBudget.save()
    .then(budget => res.json(budget))
    .catch(err => {
        res.status(500).send("Server error on post budgets")
    })
})

// //@GET budget BY ID
// router.get('/budgets/:id', (req, res) => {
//     budgetModel.findById({_id: req.params.id})
//     .then(budget => res.json(budget))
// });

// //GET budget BY QUOTE-ID
// router.get('/budgets/quote/:quoteId', (req, res) => {
//     budgetModel.find({ quoteId: req.params.quoteId})
//     .then(budget => res.json(budget))
//     .catch(err => console.log("error gettting budgets by quoteId"))
// })

// //GET budget BY WORKER-ID
// router.get('/budgets/quote/:workerId', (req, res) => {
//     budgetModel.find({ workerId: req.params.workerId})
//     .then(budget => res.json(budget))
//     .catch(err => console.log("error gettting budgets by workerId"))
// })

// //GET budget BY USER-ID
// router.get('/budgets/quote/:userId', (req, res) => {
//     budgetModel.find({ userId: req.params.userId})
//     .then(budget => res.json(budget))
//     .catch(err => console.log("error gettting budgets by userId"))
// })



module.exports = router;