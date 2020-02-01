const express = require('express')
const router = express.Router()

const quoteModel = require('../../model/quotes');

//@GET QUOTES
router.get('/quotes/all', (req, res) => {
    quoteModel.find({})
    .then(files => {
        res.send(files)
    })
    .catch(err => console.log(err));
});

//@POST QUOTE
router.post('/quotes/add', (req, res) => {
    const newQuote = new quoteModel({
        descripcion: req.body.descripcion,
        data: req.body.data,
        plazo: req.body.plazo,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        especialidadId: req.body.especialidadId,
        userId: req.body.userId,
    })
    newQuote.save().then(quote => res.json(quote))
    .catch(err => {
        res.status(500).send("Server error on quotes")
    })
})

//@GET QUOTE BY ID
router.get('/quotes/:id', (req, res) => {
    quoteModel.findById({_id: req.params.id})
    .then(quote => res.json(quote))
});

//@GET QUOTE BY USER_ID
router.get('/quotes/user/:userId', (req, res) => {
    quoteModel.find({ userId: req.params.userId })
    .then(quote => res.json(quote))
    .catch(err => console.log("error getin quotes by userId"))
})

//@GET QUOTE BY ESPECIALIDAD_ID
router.get('/quotes/especiality/:especialidadId', (req, res) => {
    quoteModel.find({ especialidadId: req.params.especialidadId})
    .then(quote => res.json(quote))
    .catch(err => console.log("error getin quotes by specialityId"))
})

// DELETE QUOTE
router.delete('/quotes/delete/:id', (req, res, next) => {
    quoteModel.findByIdAndRemove({id: req.params._id}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

  router.put('/quotes/update/:id', (req, res) => {
    var db = req.db;
    var userToUpdate = req.params.id;
      quoteModel.updateOne({ _id: userToUpdate}, req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

module.exports = router;
