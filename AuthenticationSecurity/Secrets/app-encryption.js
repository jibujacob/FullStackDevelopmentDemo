require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  email : String,
  password: String
});


userSchema.plugin(encrypt,{secret:process.env.SECRET , encryptedFields:["password"]});
const User = new mongoose.model("User",userSchema);

app.get("/",function(req,res){
  res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",function(req,res){
  const user = new User({
    email: req.body.username,
    password: req.body.password
  });

  User.find({email:req.body.username},function(err,foundList){
    if(!err){
      if(foundList.length==0){
        user.save(function(err){
          if(!err){
            console.log("User Saved Successfully");
            res.render("secrets");
          }else{
            console.log(err);
          }
        });
      }else{
        console.log("User already exists");
        res.redirect("/");
      }
    }else{
      res.send(err);
    }
  });
});

app.post("/login",function(req,res){
  User.findOne({email:req.body.username},function(err,foundUser){
    if(err){
      console.log(err);
    }else{
      if (foundUser){
        if(foundUser.password == req.body.password){
          res.render("secrets");
        }
      }
    }
  });
});

app.get("/logout",function(req,res){
  res.redirect("/");
});

app.get("/submit",function(req,res){
  res.render("submit");
})



app.listen("3000",function(){
  console.log("Server started on port 3000");
})
