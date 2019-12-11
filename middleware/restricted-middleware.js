const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');

module.exports = (req,res,next) => {
    const token = req.headers.authorization;
    console.log(req.headers.authorization)
    if(req.decodedJwt) {
        console.log('line 8', req.decodedJwt);
        next();
    }else if(token){
        jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
            if(err) {
                res.status(401).json({access:"denied on line 11"})
            } else {
                req.decodedJwt = decodedJwt; 
                next();
            }
        })
    } else {
        res.status(401).json({access:"denied on line 18"})
    }
    // if(req.session && req.session.loggedIn === true) {
    //     next();
    // }else{
    //     res.status(400).json({message: "This path is restricted to logged in users"});
    // }
}
