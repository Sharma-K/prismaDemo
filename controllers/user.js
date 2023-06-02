const prisma = require('../prisma/index');
const cookieToken = require('../utils/coookieToken');

exports.signup = async(req, res, next)=>{
     try{
        const {name, email, password} = req.body;
        if(!name||!email||!password)
        {
            throw new Error("Provide all fields")
        }

        const user = await prisma.user.create({
            data:{
                name, email, password
            }
        })

        cookieToken(user,res);

     }catch(er)
     {
          throw new Error(er);
     }
}