const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// uri
const uri =
  "mongodb+srv://Smart-Deasl:MFAc8u3xG906WmdM@crud-practice-cluster.l3ixzxm.mongodb.net/?appName=crud-practice-cluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const smartDb = client.db("smartDb");
    const productsCollection = smartDb.collection("products");

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("smart server is running");
});

app.listen(port, () => {
  console.log(`smart server is running on this port : ${port}`);
});
