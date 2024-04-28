
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app=express();
const port=process.env.PORT|| 3000;
app.use (cors({origin:["http://localhost:5173","live link url"]}))
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@cluster0.p4xzv3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
   
    const touristSpots = client.db("tourist_spotsDB").collection("spots")
    const userTouristSpot=client.db("user_tourist_spotsDB").collection("user_spots")
    app.get("/spot", async (req, res) => {
      const cursor = touristSpots.find();
      const result = await cursor.toArray();
      res.send(result);
});


app.post("/userspot", async (req, res) => {
  const newSpot = req.body;
  const result = await userTouristSpot.insertOne(newSpot);
  console.log(newSpot);
  res.send(result);
});

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
















app.get('/',(req,res)=>{
    res.send("assingment-10-server running")
})
app.listen(port,()=>{
console.log(`server is running at port ${port}`)
})