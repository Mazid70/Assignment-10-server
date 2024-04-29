const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({ origin: ["http://localhost:5174", "live link url"] }));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@cluster0.p4xzv3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const touristSpots = client.db("tourist_spotsDB").collection("spots");
    const userTouristSpot = client
      .db("user_tourist_spotsDB")
      .collection("user_spots");
    app.get("/spot", async (req, res) => {
      const cursor = touristSpots.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/spot/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await touristSpots.findOne(query);
      res.send(result);
    });
    app.get("/userspot/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userTouristSpot.findOne(query);
      res.send(result);
    });
    app.get("/userspot/user/:email/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userTouristSpot.findOne(query);
      res.send(result);
    });
    app.delete("/userspot/user/:email/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userTouristSpot.deleteOne(query);
      res.send(result);
    });
    app.put("/userspot/user/:email/:id", async (req, res) => {
      const id = req.params.id;
      const options = { upsert: true };
      const query = { _id: new ObjectId(id) };
      const updateUserSpot = req.body;
      const spot = {
        $set: {
          tourists_spot_name: updateUserSpot.tourists_spot_name,
          country_name: updateUserSpot.country_name,
          location: updateUserSpot.location,
          short_description: updateUserSpot.short_description,
          average_cost: updateUserSpot.average_cost,
          seasonality: updateUserSpot.seasonality,
          total_visitors_per_year: updateUserSpot.total_visitors_per_year,
          user_email: updateUserSpot.user_email,
          user_name: updateUserSpot.user_name,
        },
      };
      const result = await userTouristSpot.updateOne(query, spot, options);
      res.send(result);
    });

    app.post("/userspot", async (req, res) => {
      const newSpot = req.body;
      const result = await userTouristSpot.insertOne(newSpot);
      console.log(newSpot);
      res.send(result);
    });
    app.get("/userspot", async (req, res) => {
      const cursor = userTouristSpot.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/userspot/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { user_email: email };
      const result = await userTouristSpot.find(query).toArray();
      res.send(result);
    });
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("assingment-10-server running");
});
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
