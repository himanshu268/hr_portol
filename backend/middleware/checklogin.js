const jwt = require('jsonwebtoken');
const jwttoken = "notgonnadisclose";

const checklogin = (req, res, next) => {
    const token = req.header('auth-token');
    console.log(token);
    if (!req.header('auth-token') || !token) {
        res.status(401).send("Accessss Denied");


    }
    // if (!token) {
    //     res.status(401).send("Access Denied no token");
    // }
    else{
        try {
            
            const data = jwt.verify(token, jwttoken);
            req.user = data.data;
            // console.log(data.user.id)
            // console.log(data.user);
            next();
            
        } catch (error) {
            res.status(401).send("Accessss Denied");
            
            
        }
    }

}

module.exports = checklogin;