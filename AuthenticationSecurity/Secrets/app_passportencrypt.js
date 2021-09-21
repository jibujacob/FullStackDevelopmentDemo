require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  username : String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
  res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});

app.get("/secrets",function(req,res){
  if(req.isAuthenticated()){
    res.render("secrets");
  }else{
    res.redirect("/login");
  }
});

app.post("/register",function(req,res){

  User.register({username:req.body.username},req.body.password,function(err,user){
    if (err){
      console.log(err);
      res.redirect("/register");
    }else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/secrets");
      });
    }
  });
  // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  //   const user = new User({
  //     email: req.body.username,
  //     password: hash
  //   });
  //
  //   User.find({email:req.body.username},function(err,foundList){
  //     if(!err){
  //       if(foundList.length==0){
  //         user.save(function(err){
  //           if(!err){
  //             console.log("User Saved Successfully");
  //             res.render("secrets");
  //           }else{
  //             console.log(err);
  //           }
  //         });
  //       }else{
  //         console.log("User already exists");
  //         res.redirect("/");
  //       }
  //     }else{
  //       res.send(err);
  //     }
  //   });
  // });
});

app.post("/login",function(req,res){

  const user = new User({
    username:req.body.username,
    password:req.body.password
  });

  req.login(user, function(err) {
  if (err) {
    console.log(err);
  }else{
    passport.authenticate("local")(req,res,function(){
      res.redirect("/secrets");
    });
  }
  });
  // User.findOne({email:req.body.username},function(err,foundUser){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     if (foundUser){
  //       bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
  //         if(result){
  //           res.render("secrets");
  //         }
  //       });
  //     }
  //   }
  // });
});

app.get("/logout",function(req,res){
  req.logout();
  res.redirect('/');
});

app.get("/submit",function(req,res){
  res.render("submit");
})



app.listen("3000",function(){
  console.log("Server started on port 3000");
})
