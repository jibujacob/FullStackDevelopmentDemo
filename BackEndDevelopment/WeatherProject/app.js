const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,response){
  response.sendFile(__dirname +"/index.html");
});

app.post("/",function(req,response){
  const query=req.body.cityName;
  const apiKey=process.env.API_KEY;
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey +"&units=metric";

  https.get(url,function(res){
    console.log("statuscode:"+res.statusCode);

    res.on('data',function(data){

      const weatherData = JSON.parse(data);
      const desc=weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;

      const imgurl ="http://openweathermap.org/img/wn/"+icon+"@2x.png";

      console.log(icon);
      response.write("<h1>Temperature in "+query +" is "+ temp +" degrees Celcius.</h1>");
      response.write("<p>The weather is currently "+ desc +".</p>");
      response.write("<img src="+imgurl+">")
      response.send();
    })

  });
});

app.listen(3000,function(){
  console.log("Starting server and listening on port 3000");
});
