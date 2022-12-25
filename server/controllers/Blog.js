const Blog =require("../models/Blog")
Blog.count({}, function( err, count){
  console.log( "Number of users are:", count );
})