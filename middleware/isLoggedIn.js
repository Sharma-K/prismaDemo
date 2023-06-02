const prisma = require('../prisma/index');
const jwt = requier('jsonwebtoken');

const isLoggedIn = async(req, res, next) => {
    try{
        const token = req.cookie.token;

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
        throw new Error(er);
    }
}