const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Key = require('./../../config/keys').secret;

const userModel = require('../../model/users');

//@route POST api/users
router.post('/users/create', [
    check('email').isEmail(),
    check('password').isLength({ min:5 })
],  
    (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    
    userModel.findOne({email: req.body.email})
    .then(user => {
        if(user){
            return res.send("user already registered with this email")
        }

        var hash = bcrypt.hashSync(req.body.password, 8);
        const newUser = new userModel({
            userName: req.body.userName,
            email: req.body.email,
            rol: req.body.rol, 
            password: hash,
    })
    newUser.save()
    .then(user => 
        res.json(user))
    return res.send("user succesfully registered")    
    })
})

//----------- FOLLOWING THE TRAVERSY MEDIA COURSE------------//

// @route   POST api/users
// @desc    Register new user
// @access  Public
// router.post('/users/post', (req, res) => {
//     const { userName, email, password, rol } = req.body;
  
//     // Simple validation
//     if(!userName || !email || !password ||!rol) {
//       return res.status(400).json({ msg: 'Please enter all fields' });
//     }
  
//     // Check for existing user
//     userModel.findOne({ email })
//       .then(user => {
//         if(user) return res.status(400).json({ msg: 'User already exists' });
        
//         //if the user doen't exists, we create one using the model    
//         const newUser = new userModel({
//           userName,
//           email,
//           password, //this is raw -> we need bcrypt-it!
//           rol
//         });
  
//         // Create salt (to create a hash) & hash
//         bcrypt.genSalt(10, (err, salt) => { //the genSalt(10) is the default meseaure of security producig hash
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if(err) throw err;
//             newUser.password = hash; //hashed pass
//             newUser.save()
//               .then(user => {
//                 jwt.sign(
//                   { id: user.id },
//                   Key.secret,
//                   { expiresIn: 3600 },
//                   (err, token) => {
//                     if(err) throw err;
//                     res.json({
//                       token,
//                       user: {
//                         id: user.id,
//                         name: user.name,
//                         email: user.email
//                       }
//                     });
//                   }
//                 )
//               });
//           })
//         })
//       })
//   });

module.exports = router;

