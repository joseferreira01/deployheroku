const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
   try{
    const token = req.headers.authorization.split(' ')[0];
    const decode = jwt.verify(token,process.env.KEY_TOKEN);
    req.user = decode;
    next();
   } catch(err){
       return res.status(401).send({err:'unauthorized user '});
   }
}