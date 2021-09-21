//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const lodash = require ("lodash");

const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");
const itemsSchema = new mongoose.Schema({
  name: String
});

const listsSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
});

const Item = mongoose.model("Item",itemsSchema);
const WorkItem = mongoose.model("WorkItem",itemsSchema);

const List = mongoose.model("List",listsSchema);




app.get("/", function(req, res) {
  //Insert Dummy Values
  Item.find({},function(err,list){
    if(list.length==0){
      const item1 = new Item({
        name : "dummy data"
      });
      item1.save();
      res.redirect("/");
    }else{
      const day = date.getDate();
      res.render("list", {listTitle: "Today", newListItems: list});
    }
  });
});

app.post("/", function(req, res){

  const listItem = req.body.newItem;
  const listName = req.body.list;
  console.log(listItem);
  console.log(listName);

  let item = new Item({
    name:listItem
  });


  if (listName=="Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name:listName},function(err,foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    })
  }
});

app.post("/delete",function(req,res){

  const id = req.body.chkbox;
  const listTitle = req.body.listTitle;
  if (listTitle=='Today'){
    Item.findByIdAndDelete(id,function(err){
      if (err){
        console.log("Failure in record deletion");
      }else{
        console.log("Successfull record deletion");
      }
    });
    res.redirect("/");
  }else{
    List.findOneAndUpdate({name:listTitle},{$pull:{items:{_id:id}}},function(err){
      if (!err){
        res.redirect("/"+listTitle);
      }
    });
  }
});

app.get("/:newpage",function(req,res){
  const newPageName = lodash.capitalize(req.params.newpage);
  console.log(newPageName);
  List.find({name:newPageName},function(err,foundlist){
    console.log(foundlist);
    if (foundlist.length==0){
      const list = new List({
        name : newPageName,
        items : [new Item({
          name:"dummy"
        })]
      });
      list.save();
      res.redirect("/"+newPageName);
    }else{
      //res.redirect("/");
      res.render("list", {listTitle: newPageName, newListItems: foundlist[0].items});
    }
  });

});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
