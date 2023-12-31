const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware..........................

app.use(express.json());
app.use(cors());

// CRUD OPERATION.....................



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@tourist.f4ab7ob.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const packageCollection = client.db("Tourist_Data").collection("packages");

    app.get("/packages", async (req, res) => {
      result = await packageCollection.find().toArray();
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('tourist server is running port 5000')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
