const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const bidsCollection = smartDb.collection("bids");
    const userCollection = smartDb.collection("user");

    // USERS APIS
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const email = newUser.email;
      const query = { email: email };
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        console.log({ massage: "this user already sign up " });
      } else {
        const result = await userCollection.insertOne(newUser);
        res.send(result);
      }
    });

    // PRODUCTS APIS
    app.get("/products", async (req, res) => {
      // customize product details ***

      // const projectsFields = {
      //   title: 1,
      //   price_min: 1,
      //   price_max: 1,
      //   image: 1,
      //   seller_name: 1,
      // };
      // const cursor = productsCollection
      //   .find()
      //   .sort({ _id: -1 })
      //   .limit(10)
      //   .skip(4)
      //   .project(projectsFields);

      console.log(req.query);
      const email = req.query.email;
      const query = {};
      if (email) {
        query.email = email;
      }

      const cursor = productsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/latest-products", async (req, res) => {
      const cursor = productsCollection
        .find()
        .limit(6)
        .sort({ created_at: -1 });
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const newProducts = req.body;
      const result = await productsCollection.insertOne(newProducts);
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updateProduct = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          brand: updateProduct.brand,
          name: updateProduct.name,
          price: updateProduct.price,
        },
      };
      const result = await productsCollection.updateOne(query, update);
      res.send(result);
    });

    // BIDS RELATED APIS
    app.get("/bids", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.buyer_email = email;
      }

      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/bids", async (req, res) => {
      const newBids = req.body;
      const result = await bidsCollection.insertOne(newBids);
      res.send(result);
    });

    // find all user data
    app.get("bids", async (req, res) => {
      const cursor = bidsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // find single user data
    app.get("/bids/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bidsCollection.findOne(query);
      res.send(result);
    });

    app.delete("/bids/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bidsCollection.deleteOne(query);
      res.send(result);
    });

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
