
const express = require('express')
const router = express.Router()
var cors = require('cors');
router.use(cors())

const quoteModel = require('../../model/quotes');
const budgetModel = require('../../model/budgets');

//GET budgetsssss
router.get('/budgets/all', (req, res) => {
    budgetModel.find({})
    .then(files => {
        res.send(files)
    })
    .catch(err => console.log('error geting all budgets'))
});

//POST budget
router.post('/budgets/add/:id', (req, res) => {
    const newBudget = new budgetModel({
        // especialidadId: req.body.especialidadId,
        titulo: req.body.titulo,
        precio: req.body.precio,
        quoteId: req.body.quoteId,
        mensaje: req.body.mensaje,
        workerId: req.body.workerId,
        userId: req.body.userId,
    })

    newBudget.save()
    .then(budget => 
      quoteModel.findOneAndUpdate
      (
        {_id: req.body.quoteId},
        {$addToSet: {budgets: 
            {$each : [budget.id]}}}, {new: true},
            (err, newAux) => {
              if(err){
                res.status(500).send(err)
              }else{
                res.status(200).send({budgets: newAux.budgets})}}
        ))            
    .catch(err => {
        res.status(500).send("Server error on post budgets")
    })
})

//@GET budget BY ID
router.get('/budgets/get/:id', (req, res) => {
    budgetModel.findById({_id: req.params.id})
    .then(budget => res.json(budget))
});

//@GET budget BY WORKER-ID
router.get('/budgets/worker/', (req, res) => {
  budgetModel.find({workerId: req.body.id})
  .then(budget => 
    res.json(budget))
});

//GET budget BY QUOTE-ID
router.get('/budgets/quote/:quoteId', (req, res) => {
    budgetModel.find({ quoteId: req.params.quoteId, estado: true})
    .then(budget => res.json(budget))
    .catch(err => console.log("error gettting budgets by quoteId"))
})

//GET budget BY WORKER-ID
router.get('/budgets/worker/:workerId', (req, res) => {
    budgetModel.find({ workerId: req.params.workerId})
    .then(budget => 
      res.json(budget))
    .catch(err => 
      console.log("error gettting budgets by workerId"))
})

//GET budget BY USER-ID
router.get('/budgets/user/:userId', (req, res) => {
    budgetModel.find({ userId: req.params.userId})
    .then(budget => 
      res.json(budget))
    .catch(err => 
      console.log("error gettting budgets by userId"))
})


// DELETE BUDGET
router.delete('/budgets/delete/:id', (req, res, next) => {
    budgetModel.findByIdAndRemove({_id: req.params.id}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

  // DELETE BUDGET BY QUOTEID
router.delete('/budgets/delete/byquote/:id', (req, res, next) => {
    budgetModel.deleteMany({ quoteId: req.params.id}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })


  //REJECT BUDGET BY QUOTEID
router.put('/budgets/rejectbyquoteid/:id', (req, res) => {
  //CHANGING THE STATE OF BUDGET FROM TRUE TO FALSE
    budgetModel.findOneAndUpdate
    (
      { _id: req.params.id},
      {$set: {estado: false}}, {new: true},
          (err, newAux) => {
            if(err){
              res.status(500).send(err)
            }else{
              res.status(200).send({estado: false})}}
      )            
  .catch(err => {
      res.status(500)
      .send("Server error on post budgets")
  })
})


module.exports = router;