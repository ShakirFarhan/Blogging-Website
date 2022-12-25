const bodyParser = require('body-parser')
const express=require('express')
// const { expressjwt: jwt }=require('express-jwt')
const authRouter=require("./router/Auth.js")
const userRouter=require("./router/Users.js")
const blogRoutes=require("./router/Blogs.js")
require('dotenv').config()

const cookieParser=require('cookie-parser')

const cors=require("cors")
const app=express()
const mongoConnection=require('./mongoDB/connection.js')


const corsConfig = {
  credentials: true,
  origin: true,
};
// const jwtSecret = 'secret123';
const PORT=process.env.PORT || 8000
app.use(cookieParser())
app.use(bodyParser.json({extended:true,limit:"50mb"}))
app.use(bodyParser.urlencoded({extended:true,limit:"50mb",parameterLimit:50000}))
app.use(cors(corsConfig))
// app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));

app.use("/",authRouter)
app.use("/",userRouter)
app.use("/",blogRoutes)

mongoConnection()
app.listen(PORT,()=>{
  console.log(`Listening at Port ${PORT}`)
})
