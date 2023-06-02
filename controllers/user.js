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

exports.login = async(req, res, next)=>{
    try{

        const {email, password} = req.body;
        console.log('email:',email);
        if(!email||!password)
        {
            throw new Error('Provide all fields');
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user)
        {
            throw new Error('User not found!');

        }
        if(user.password!==password)
        {
            throw new Error('Password is not correct!');

        }

        cookieToken(user, res);



    }catch(er)
    {
        throw new Error(er)
    }
}

exports.logout = async(req, res, next) =>{
    try{
        res.clearCookie('token');
        res.json({
            success: true
        })
    }catch(err)
    {
        throw new Error(err);
    }
}