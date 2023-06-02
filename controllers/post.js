const prisma = require('../prisma/index');

exports.createPost = async(req, res, next) => {
    try{

        const {title, authorId} = req.body;
        const post = await prisma.post.create({
            data:{
                title, 
                author:{
                  connect: {
                    id: authorId
                  }
                }

            }
        })
        res.json(post);

    }catch(err)
    {
        throw new Error(err);
    }
}

exports.editPost = async(req, res, next)=>{
  const {id} =  req.params;
  const {title, body} = req.body;

  try{
    const result = await prisma.post.update({
        where:{id: id},
        data:{
            title: title
        }
    })
    res.json(result);

  }catch(er)
  {
    res.json({error: 'Post with id does not exist'})

  }
}

exports.deletePost = async(req, res, next) => {
    const  { id } = req.params;

    try{
      
        const result = await prisma.post.delete({
            where:{
                id: id
            }
        })
        res.json(result);

    }catch{
        res.json({error: 'Post with id does not exist'})
    }
}

exports.getPosts = async(req, res, next) => {
    try{

        const result = await prisma.post.findMany();
         res.json(result);
    }catch(err)
    {
    res.json({error: 'Nothing found'})

    }
}

