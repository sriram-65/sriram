const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();
const PORT =  8080;



mongoose.connect("mongodb+srv://sriram65raja:ram@cluster0.55tsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));




const Post = require("./models/model");


app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("home", { posts });
});


app.post("/upload", upload.single("pdf"), async (req, res) => {
  const newpost = new Post({
    title: req.body.title,
    description: req.body.description,
    pdfPath: req.file.path,
  });

  await newpost.save(); 
  res.redirect("/"); 
});

app.post("/comment/:id", async (req, res) => {
  const postId = req.params.id;
  const { username, content } = req.body;

  try {
    const post = await Post.findById(postId);
    post.comments.push({ username, content });
    await post.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error submitting comment.");
  }
});

 
app.get("/about" , (req,res)=>{
    res.send("<h1> this is About Page </h1> <p> iam sriram studying at Muthu Theaver Mukultore School , thiruNagar Madurai and iam full stack Web Developer")
})
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
