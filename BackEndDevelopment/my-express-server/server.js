const express = require("express");
const app = express();

app.get("/",function(request,response){
  response.send("<h1>Hello Welcome to the world of Web Development</h1>");
});

app.get("/contact",function(request,response){
  response.send("<h2>Contact me at: jibujacob@gmail.com</h2>");
});

app.get("/about",function(request,response){
  response.send("<h2>I'm on a break and concentrating on improving my skillset</h2>");
});

app.listen(3000,function(){
  console.log("Server started on port 3000");
});
