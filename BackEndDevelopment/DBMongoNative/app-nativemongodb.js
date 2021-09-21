const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri ="mongodb://localhost:27017";

const dbName = "shopDB";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db(dbName);
    const product = database.collection('product');
    // Query for a movie that has the title 'Back to the Future'
    let query = { _id: 1};
    let result = await product.findOne(query);
    console.log(result);

    const newentry={
      _id:4,
      name:"Sharpner",
      price:0.9,
      stock:10,
      reviews:[
        {
          authorName:"Sijin",
          rating: 1,
          review:"Poor product"
        }
      ]
    };

    result = await product.insertOne(newentry);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    query = { _id: 4};
    result = await product.findOne(query);
    console.log(result);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
