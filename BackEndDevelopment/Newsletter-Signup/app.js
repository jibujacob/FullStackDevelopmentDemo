const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    console.log(req.body);
    const firstName = req.body.inputFirstName;
    const lastName = req.body.inputLastName;
    const email = req.body.inputEmail;

    const data = {
      members:[{
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME : firstName,
          NAME : lastName}
      }]
    }

    const jsonData = JSON.stringify(data);
    const url="https://us5.api.mailchimp.com/3.0/lists/9e9aabcfbc";
    const options = {
      method: "POST",
      auth: "jj1:aa192b2e3f8b8d3d43ea75f9a663a317a-us5"
    }

    const postRequest=https.request(url, options, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
          console.log(JSON.parse(data));
        })

        if (Number(response.statusCode) == 200){
          res.sendFile(__dirname+"/success.html");
        }else{
          res.sendFile(__dirname+"/failure.html");
        }
    });

    postRequest.write(jsonData);
    postRequest.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(3000,function(){
  console.log("server is running on port 3000");
})


//

//9e9aabcfbc
