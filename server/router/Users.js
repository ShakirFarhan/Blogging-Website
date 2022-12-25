const express=require('express')
const router=express.Router()
const Users=require("../models/user.js")
const mongoose=require('mongoose');
// const user = require('../models/user.js');
var ObjectId = mongoose.Types.ObjectId;
router.get("/getuser",async(req,res)=>{
 try {
  Users.find((err,e)=>{
    if(err)console.log(err)
    res.json({users:e})
  })
 } catch (error) {
  console.log(error)
  res.send(error)
 }
})
router.get("/userById/:id",(req,res)=>{
  const {id}=req.params
    Users.findById({_id:id},(err,e)=>{
       if(err) res.json({message:err})
       res.json({success:e})
     })  
})
router.patch("/updateUser/:id",async(req,res)=>{
const {id}=req.params
 Users.findByIdAndUpdate(id,{$set:req.body},(err,e)=>{
  console.log(req.body)
  if(err)console.log(err)
  res.json({success:e})
 })
  
})
router.delete("/deleteUser/:id",(req,res)=>{
  const {id}=req.params
  Users.findByIdAndDelete(id,(err,e)=>{
    if(err) res.json({err:err})
    res.json({success:"deleted"})
  })
})
router.patch("/:id/follow",async(req,res)=>{
  // console.log(req.body)
  
  if(req.body.userId!==req.params.id){
    try {
      const user=await Users.findById(req.params.id);
      const currentUser=await Users.findById(req.body.userId);
      if(!user.followers.includes(req.body.userId)){
        await user.updateOne({$push:{followers:req.body.userId}})
        await currentUser.updateOne({$push:{followings:req.params.id}})
        res.json({message:"Success"})
      }
      else{
        res.json({message:"You already follow"})
      }
    } catch (error) {
      res.send(error)
    }
  }
  else{
    res.send("You can follow yourself")
  }
  })
  router.patch("/:id/unfollow",async(req,res)=>{
    if(req.body.userId!==req.params.id){
      try {
        const user=await Users.findById(req.params.id);
        const currentUser=await Users.findById(req.body.userId);
        if(user.followers.includes(req.body.userId)){
          await user.updateOne({$pull:{followers:req.body.userId}})
          await currentUser.updateOne({$pull:{followings:req.params.id}})
          res.json({message:"Success"})
        }
        else{
          res.json({message:"You Dont follow this user"})
        }
      } catch (error) {
        res.send(error)
      }
    }
    else{
      res.send("You can follow yourself")
    }
    })
router.get('/:id/followers',async(req,res)=>{
  const {id}=req.params
  let followers=[]

const user=await Users.findOne({_id:id})
if(!user){
  res.json({message:"Invalid User ID"})
}
else{
  user.followers.map((e)=>followers.push(e))
  res.json({followers:followers})
  
}

})
router.get('/:id/followings',async(req,res)=>{
  const {id}=req.params
  let followings=[]
  const user=await Users.findOne({_id:id})
  if(!user){
    res.json({message:"Invalid User ID"})
  }
  else{
    user.followings.map((e)=>followings.push(e))
    res.json({followings:followings})
    
  }
  
})

router.get("/userscount",(req, res)=> {

  Users.count(function(err, count) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
          res.send(err)

      res.json({count:count}); // return return the count in JSON format
      // console.log(count)
  });
})

router.get("/search/author?",async(req,res)=>{
  const {q}=req.query
  await Users.find({username:{$regex:q,$options:"$i"}}).then((data)=>res.json(data)).catch((error)=>res.json(error))
})

module.exports=router