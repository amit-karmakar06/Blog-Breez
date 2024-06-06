const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');
const multer  = require('multer');
//
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
//
const upload = multer({ storage: storage });
app.use(express.urlencoded({extended:true})); 
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); 
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))





let posts = [
    {
        imageUrl: "https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=2096&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        id : uuidv4(),
        username : "Amit",
        content : "The aroma of coffee filled the air as she entered the café on a chilly morning."
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsb2d8ZW58MHx8MHx8fDA%3D",
        id : uuidv4(),
        username : "John",
        content : "She wrapped herself in a cozy blanket and settled in with a good book by the fireplace."
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        id : uuidv4(),
        username : "Alex",
        content : "His backpack was filled with adventure essentials: a map, a compass."
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        id : uuidv4(),
        username : "Ryan",
        content : "The cat sat on the windowsill, watching the rain fall."
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1600106282546-5014fd6da699?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        id : uuidv4(),
        username : "David",
        content : "As the clock struck midnight, the old house creaked eerily in the silence."
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1508154048109-de555266b70a?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        id : uuidv4(),
        username : "Jack",
        content : "The smell of freshly baked bread filled the kitchen, making everyone's mouth water."
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1565109254792-8856bba5abfb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        id : uuidv4(),
        username : "Jackson",
        content : "He decided to take a long walk to clear his mind after the heated argument."
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1543081143-12818e4f5bdb?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        id : uuidv4(),
        username : "Alexa",
        content : "The sound of waves crashing against the shore was soothing and hypnotic."
    }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts}); 
});

app.get("/posts/new", (req, res)=>{
    res.render("form.ejs")
})

//
app.post("/posts", upload.single('image'), (req, res) => {
    const { username, content } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    posts.push({
        imageUrl,
        id: uuidv4(),
        username,
        content,
    });
    res.redirect("/posts");
});
//

app.post("/posts", (req, res) => {
    let {username, content} = req.body
    let newid = uuidv4()
    posts.push({newid, username, content})
    res.redirect("/posts")
})

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params
    let newcontent = req.body.content
    let post = posts.find((p) => id === p.id)
    post.content = newcontent
    console.log(post)
})

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params
    posts = posts.filter((p) => id !== p.id)
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params
    let post = posts.find((p) => id === p.id)
    res.render("edit.ejs", {posts})
})

app.get("/posts/:id", (req, res) => {
    let {id} = req.params
    let post = posts.find((p) => id === p.id)
    res.render("show.ejs", {post})
})

app.listen(port, () => {
  console.log("Server started");
});
