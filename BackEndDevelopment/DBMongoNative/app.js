const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

  const fruitSchema = new mongoose.Schema({
    name: String,
    rating : Number,
    review : String
  });

  const Fruit = mongoose.model("Fruit",fruitSchema);

  // const apple = new Fruit({
  //   name: "Apple",
  //   rating: 7,
  //   review: "Pretty solid as a fruit"
  // });
  // const banana = new Fruit({
  //   name: "banana",
  //   rating: 9,
  //   review: "Pretty solid as a fruit"
  // });
  // const kiwi = new Fruit({
  //   name: "Kiwi",
  //   rating: 8,
  //   review: "Pretty solid as a fruit"
  // });

  // Fruit.insertMany([apple,banana,kiwi],function(err){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log("Successfully inserted the fruits");
  //   }
  // });

  Fruit.find(function(err,fruits){
    if (err){
      console.log(err);
    }else{
      mongoose.connection.close();
      fruits.forEach(function(fruit){
        console.log(fruit.name);
      });
    }
  });
