const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title : String,
  content : String
};

const Article = mongoose.model("Article",articleSchema);

app.get("/",function(req,res){
  res.send("REstful Learning");
});

app.route("/articles")
  .get(function(req,res){
      Article.find({},function(err,articleList){
        if(!err){
          res.send(articleList);
        }else{
          res.send(err);
        }
      });
    })
  .post(function(req,res){
      const newArticle = new Article({
        title:req.body.title,
        content:req.body.content
      });

      newArticle.save(function(err){
        if (!err){
          res.send("Successfully added a new Article");
        }else{
          res.send(err);
        }
      });
    })
  .delete(function(req,res){
      Article.deleteMany({},function(err){
        if(!err){
          res.send("Successfully deleted all Articles");
        }else{
          res.send(err);
        }
      });
    }
  );

app.route("/articles/:title")
  .get(function(req,res){
      Article.findOne({title:req.params.title},function(err,foundArticle){
        if(!err){
          res.send(foundArticle);
        }else{
          res.send(err);
        }
      });
    })
  .delete(function(req,res){
      Article.deleteOne({title:req.params.title},function(err){
        if(!err){
          res.send("Successfully deleted Article: "+req.params.title);
        }else{
          res.send(err);
        }
      });
    })
  .put(function(req,res){
    Article.updateOne(
      {title:req.params.title},
      { title:req.body.title,
        content:req.body.content},
      {overwrite:false},
      function(err){
        if(!err){
          res.send("Successfully updated Article");
        }else{
          res.send(err);
        }
      }
    );
    })
  .patch(function(req,res){
    Article.updateOne(
        {title:req.params.title},
        {$set:req.body},
        function(err){
          if(!err){
            res.send("Successfully updated Article");
          }else{
            res.send(err);
          }
        }
    );
  })
  ;

app.listen("3000",function(){
  console.log("Server started on port 3000");
})
