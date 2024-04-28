// const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({ origin: ["http://localhost:5173", "live link url"] }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("assingment-10-server running");
});
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
