const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = require("./smart-deals-firebase-admin-key.json");

initializeApp({
  credential: cert(serviceAccount),
});

// middleware
app.use(cors());
app.use(express.json());

const logger = (req, res, next) => {
  console.log("logging information");
  next();
};

const verifiedFirebaseToken = async (req, res, next) => {
  // console.log("in the verified middleware", req.headers.authorization);
  if (!req.headers.authorization) {
    // don't allow to go there
    return res.status(401).send({ message: "unAuthorization access" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "unAuthorization access" });
  }

  try {
    const userInfo = await getAuth().verifyIdToken(token);
    req.token_email = userInfo.email;
    console.log(" after token validation", userInfo);
    next();
  } catch (error) {
    console.log(" invalided token ");
    return res.status(401).send({ message: "Unauthorized access" });
  }
};

const verifiedJWTToken = async (req, res, next) => {
  console.log("headers in middleware", req.headers);
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "unAuthorization access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "unAuthorization access" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: "unAuthorization access" });
    }
    console.log(decoded);
    req.token_email = decoded.email;
    next();
  });
};

// uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@crud-practice-cluster.l3ixzxm.mongodb.net/?appName=crud-practice-cluster`;

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
    const myProductsCollection = smartDb.collection("myProducts");

    // JWT Related APIS
    app.post("/getToken", (req, res) => {
      const loggedUser = req.body;
      const token = jwt.sign(loggedUser, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token: token });
    });

    // MyProducts APIS
    app.post("/myProducts", async (req, res) => {
      const newProducts = req.body;
      const result = await myProductsCollection.insertOne(newProducts);
      res.send(result);
    });

    app.get("/myProducts", verifiedFirebaseToken, async (req, res) => {
      const email = req.query.email;
      const query = {};
      // console.log(req.query);
      // console.log(req);
      if (email) {
        if (email !== req.token_email) {
          return res.status(403).send({ message: "Forbidden access" });
        }
        query.seller_email = email;
      }

      const cursor = myProductsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/myProducts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await myProductsCollection.findOne(query);
      res.send(result);
    });

    app.delete("/myProducts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await myProductsCollection.deleteOne(query);
      res.send(result);
    });

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

      // console.log(req.query);
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

    // BIDS RELATED APIS with authentication firebase

    app.get("/bids", verifiedJWTToken, async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.buyer_email = email;
      }
      if (email !== req.token_email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // app.get("/bids", logger, verifiedFirebaseToken, async (req, res) => {
    //   // console.log("headers--", req);
    //   const email = req.query.email;
    //   const query = {};
    //   if (email) {
    //     if (email !== req.token_email) {
    //       return res.status(403).send({ message: "Forbidden access" });
    //     }
    //     query.buyer_email = email;
    // //   }

    //   const cursor = bidsCollection.find(query);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    app.get("/products/bids/:productId", async (req, res) => {
      const productId = req.params.productId;
      const query = { product: productId };
      const cursor = bidsCollection.find(query).sort({ bid_price: -1 });
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/bids", async (req, res) => {
      const newBids = req.body;
      const result = await bidsCollection.insertOne(newBids);
      res.send(result);
    });

    // find all user data
    app.get("/bids", async (req, res) => {
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
