const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('public'));
app.set('view engine', 'ejs');

let newItems = [];
let workItems = [];

app.get("/", function(req, res) {
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric"
  }
  let date = new Date();
  let day = date.toLocaleDateString("en-US", options);
  console.log(day);

  res.render("list", {
    List: day,
    newItemList: newItems
  });
})

app.post("/", function(req, res) {
  item = req.body.todolistitem;
  if (req.body.button == "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    newItems.push(item);
    res.redirect("/");
  }
})

app.get("/work", function(req, res) {
  res.render("list", {
    List: "Work",
    newItemList: workItems
  });
});

app.get("/about",function(req,res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server Started listening from port 3000");
})
