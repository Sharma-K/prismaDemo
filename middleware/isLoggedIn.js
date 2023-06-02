const prisma = require('../prisma/index');
const jwt = require('jsonwebtoken');

const isLoggedIn = async(req, res, next) => {
    try{
        const token = req.cookies.token;

        if(!token)
        {
            res.send('Please Login');
            throw new Error('You are not logged In')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findFirst({
            where:{
                id: decoded.userId
            }
        })
        next();
    }
    catch(er)
    {
       res.json({message: 'Please sign in'})
    }
}

module.exports = isLoggedIn;