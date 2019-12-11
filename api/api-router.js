const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./api-model');
const restricted = require('../middleware/restricted-middleware');
const jwt = require('jsonwebtoken');

const genToken = (user) => {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const secret = 'token';
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secret, options)
}

router.post('/register', (req,res) => {
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 12);
    newUser.password = hash;
    db.add(newUser).then(user => {
        res.status(201).json({message: "You have been added to the database!"})
    }).catch(err => res.status(500).json({error: err}))
})

router.post('/login', (req,res) => {
    const {username, password} = req.body;
    // req.session.loggedIn = false;
    db.findBy({username}).first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            // req.session.loggedIn = true;
            const token = genToken(user);
            res.status(200).json({message: "you have logged in!", token})
        }else{
            res.status(401).json({message: "user not found"})
        }
    }).catch(err => res.status(500).json({error: err}))
})

router.get('/users',restricted, (req,res) => {
    db.find().then(users => {
        res.status(200).json(users)
    }).catch(err => res.status(500).json({error: err}))
})

module.exports = router;