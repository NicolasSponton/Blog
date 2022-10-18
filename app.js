//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const { slice } = require("lodash");
const mongoose = require("mongoose");
const { handle } = require("express/lib/application");

//Connection to local DB
mongoose.connect('mongodb://127.0.0.1:27017/blogDB');

//Set DB collectionsasdsadsaasdsadadasdasdsada
const entrySchema = {
  title: String,
  text: String,
  shortText: String,
  url: String
}

const Entry = mongoose.model("entry",entrySchema);

const homeStartingContent = 'Welcome to my blog where you can read all current entrys and even create your owns on the "compose" section, all of them will be stored on a mongoDB DataBase. This web app is made using express to get the server up and running, and ejs templates to simplify html interactions. Entys will only show up to 100 characters on the home screen, if you want to read the complete entry on a separate page, you have to click on "Read more". You can delete entrys clicking on the trashcan.';
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//Prepare set up app, bodyParser, ejs and a static folder

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


/////// HTTP requests ////////

app.get("/",(req,res)=>{
  Entry.find({},(err,entrys)=>{
    res.render("home.ejs",{homeText:homeStartingContent,entrys:entrys});
  });
});

app.post("/delete",(req,res)=>{
  
    Entry.findByIdAndRemove(req.body._id,(err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Successfully deleted item");
        res.redirect("/");
      }
    });

});

app.get("/about",(req,res)=>{
  res.render("about.ejs",{item:aboutContent});
});

app.get("/contact",(req,res)=>{
  res.render("contact.ejs",{item:contactContent});
});

app.get("/compose",(req,res)=>{
  res.render("compose.ejs");
});

app.post("/",(req,res)=>{

  var shortText = req.body.text
  if(shortText.length > 100){shortText = req.body.text.slice(0,100) + "..."};

  const entry = new Entry({
    title: req.body.title,
    text: req.body.text,
    shortText: shortText
  });

  entry.save((err)=>{
    if(!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:smt",(req,res)=>{
  Entry.find({},(err,entrys)=>{
    entrys.forEach((item)=>{
      if(req.params.smt == item._id){
        res.render("post.ejs",item);
      }
    });
  });
});


//Local server

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
