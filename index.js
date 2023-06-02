const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');

require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use('/api', userRouter )


app.get('/', async(req, res)=>{
    
    res.send('Hello World');
})

app.listen(3000,()=>{
    console.log('Listening to the port');
})