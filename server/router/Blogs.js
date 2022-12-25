const express = require("express");
const Blog = require("../models/Blog.js");
const { find, findById } = require("../models/user.js");
const router = express.Router();
const text = require("html-to-text");
const request = require("request");
const Users = require("../models/user.js");
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let totalBlogs = 0;

router.post("/addBlog", async (req, res) => {
  const d = new Date();
  const date =
    +d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear();
  console.log(date);
  const { title, authorid, image, description, category, readtime } = req.body;
  const author = await Users.findOne({ _id: authorid });
  const data = {
    title: title,
    authorid: authorid,
    authorImage: author.profilePic,
    authorName: author.username,
    image: image,
    description: description,
    category: category,
    readtime: readtime,
    publishDate: date,
  };
  // console.log(author)
  const blog = new Blog(data);
  try {
    await blog.save();
    res.json({ message: "blog added" });
    console.log("yayyyyy");
  } catch (error) {
    console.log(error);
  }
});
router.get("/blogs", async (req, res) => {
  try {
    await Blog.find({}, (err, e) => {
      if (err) console.log(err);
      res.json(e);
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findById(id, (err, e) => {
      if (err) console.log(err);
      res.json({ message: e });
    });
  } catch (error) {
    console.log(error);
  }
});
router.patch("/update/blog/:id", async (req, res) => {
  const { id } = req.params;
  const d = new Date();
  const date = monthNames[d.getMonth()] + " " + d.getDate();
  const {
    title,
    authorid,
    image,
    description,
    likes,
    comments,
    category,
    publishDate,
    readtime,
    userId,
  } = req.body;
  const data = {
    title: title,
    authorid: authorid,
    image: image,
    description: description,
    category: category,
    readtime: readtime,
    publishDate: "Edited " + date,
  };
  const blog = await Blog.findOne({ _id: id });
  if (blog.authorid == userId) {
    try {
      await Blog.findByIdAndUpdate(id, { $set: data }, (err, e) => {
        if (err) console.log(err);
        res.json({ success: "Updated" });
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ message: "Cannot update others blog" });
  }
});
router.delete("/delete/blog/:id", (req, res) => {
  const { id } = req.pa;
});

router.get("/blogsByAuthorId/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blogs = await Blog.find({ authorid: id });
    res.json({ Blogs: blogs });
  } catch (error) {
    res.json({ err: error });
  }
});
router.get("/categorycount", async (req, res) => {
  try {
    const blockchain = await Blog.find({ category: "Blockchain" });
    const fashion = await Blog.find({ category: "Fashion" });
    const technology = await Blog.find({ category: "Technology" });
    const Business = await Blog.find({ category: "Business" });
    const health = await Blog.find({ category: "Health" });
    const fitness = await Blog.find({ category: "Fitness" });
    const javascript = await Blog.find({ category: "javascript" });
    res.json({
      blockchain: blockchain.length,
      fashion: fashion.length,
      technology: technology.length,
      business: Business.length,
      health: health.length,
      fitness: fitness.length,
      javascript: javascript.length,
    });
  } catch (error) {
    res.json(error);
  }
});
router.get("/tag/:id", async (req, res) => {
  const { id } = req.params;
  const blogs = await Blog.find({ category: id });
  //  res.send(blogs)
  if (blogs) {
    res.json({ blogs: blogs });
  } else {
    res.json({ message: "No Blogs Available" });
  }
});

router.get("/blogscount", (req, res) => {
  // use mongoose to get the count of Users in the database
  Blog.count(function (err, count) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) res.send(err);

    res.json({ count: count }); // return return the count in JSON format
    // console.log(count)
  });
});
router.get("/search/title?", async (req, res) => {
  const { q } = req.query;
  await Blog.find({ title: { $regex: q, $options: "$i" } })
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});
router.get("/search/category?", (req, res) => {
  const { q } = req.query;
  Blog.find({ category: { $regex: q, $options: "$i" } })
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});
router.patch("/bookmarks/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const blog = await Blog.findOne({ _id: id });
  const user = await Users.findOne({ _id: userId });
  if (user) {
    try {
      if (!user.bookmarks.includes(id)) {
        await user.updateOne({ $push: { bookmarks: id } });
        res.json("Bookmarked");
      } else {
        res.json("already Bookmarked");
      }
    } catch (error) {}
  }
});
router.patch("/bookmark/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  console.log(id, userId);
  const blog = await Blog.findOne({ _id: id });
  const user = await Users.findOne({ _id: userId });
  if (user) {
    try {
      if (!user.bookmarks.includes(id)) {
        await user.updateOne({ $push: { bookmarks: id } });
        res.json("Bookmarked");
      } else {
        res.json("already Bookmarked");
      }
    } catch (error) {}
  }
});
router.patch("/unbookmark/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const blog = await Blog.findOne({ _id: id });
  const user = await Users.findOne({ _id: userId });
  if (user) {
    try {
      if (user.bookmarks.includes(id)) {
        await user.updateOne({ $pull: { bookmarks: id } });
        res.json("unbookmarked");
      } else {
        res.json("bookmark first");
      }
    } catch (error) {}
  }
});
router.patch("/like/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const blog = await Blog.findOne({ _id: id });
  if (blog) {
    if (!blog.likes.includes(userId)) {
      await blog.updateOne({ $push: { likes: userId } });
      res.json("Liked");
    } else {
      res.json("You already liked it");
    }
  } else {
    res.json("No blogs found");
  }
});
router.patch("/unlike/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const blog = await Blog.findOne({ _id: id });
  if (blog) {
    if (blog.likes.includes(userId)) {
      await blog.updateOne({ $pull: { likes: userId } });
      res.json("unliked");
    } else {
      res.json("You never liked it ");
    }
  } else {
    res.json("No blogs found");
  }
});
router.patch("/test", (req, res) => {
  console.log(req.body);
});
module.exports = router;
