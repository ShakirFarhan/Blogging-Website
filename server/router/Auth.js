const express=require("express")
const router=express.Router()
const bcrypt=require('bcryptjs')
const cookie=require('cookie-parser')
const Users=require("../models/user.js")
const authentication=require("../middleware/Auth.js")

router.post('/register',async(req,res)=>{
  const {username,email,password,confirmpassword,profilePic,instagram,twitter,facebook,linkedin,bio}=req.body
  const data={
    username:username,
    email:email,
    password:password

  }
  function isValid(username) { return /^\w+$/.test(username);}
  const valid=isValid(username)
  const userExist=await Users.findOne({email:email})
  const usernameExist=await Users.findOne({username:username})
  if(!userExist){
    if(data.username===""){
      res.json({error:"Username Can't Be Empty"})
    }
    else if(!valid){
      res.json({error:"Invalid Username"})
    }
    else if(usernameExist){
      res.json({error:"Username Already Exists"})
    }
    else if(data.email===""){
      res.json({error:"Email Can't Be Empty"})

    }
    else if(!data.email.includes("@") && !data.email.includes(".")){
      res.json({error:"Invalid Email"})

    }
    else if(!password || !confirmpassword){
      res.json({error:"Provide Password"})
    }
    else if(password===confirmpassword){
      const newUser=new Users(data)
      try {
       await newUser.save()
       res.json({message:"Registered"})
      } catch (error) {
       console.log(error)
       res.send(error)
      }
    }
    else{
      res.json({error:"Passwords Did Not Match"})
    }
  }
  else{
    res.json({error:"User Already Exist"})
  }
})
router.post("/login",async(req,res)=>{
  const {email,password}=req.body
  const validUser=await Users.findOne({email:email})
  if(validUser){
    // console.log(validUser)
    const validPassword=await bcrypt.compare(password,validUser.password)
    // console.log(validPassword)
    if(!validPassword){
      res.json({error:"Invalid Password"})
    }
    else{
      const token=await validUser.generateAuthToken()
      res.cookie("JWTFINALTOKEN",token,{
        expires:new Date(Date.now()+9000000),
        httpOnly:true,
      })
      await validUser.save()
     const result={
      validUser,token
     }
    
     res.status(201).json({status:201,result})
    }
    
  }
  else{
    res.json({error:"Invalid User"})
  }
 
})
router.get("/validuser",authentication,async(req,res)=>{
  try {
    let userValid=await Users.findOne({_id:req.userId})
    if(userValid){
      res.status(201).json({status:201,userValid})
    }
  } catch (error) {
    res.json({status:401,userValid})
    
  }
})
router.get("/logout",authentication,async(req,res)=>{
  try {
    req.rootUser.tokens=req.rootUser.tokens.filter((e)=> {return e.token!=req.token})
    res.clearCookie("JWTFINALTOKEN",{path:'/'})
   await req.rootUser.save()
    res.status(201).json({status:201})
  } catch (error) {
    res.status(201).json({message:"no logout",tokens:req.rootUser.tokens})
  }
})
module.exports=router