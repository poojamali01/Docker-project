const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017";
const DATABASE_NAME =
  process.env.MONGO_DATABASE || "crochet_corner";

const client = new MongoClient(MONGO_URI);

let productsCollection;

async function connectToDatabase() {
  await client.connect();

  const database = client.db(DATABASE_NAME);

  productsCollection = database.collection("products");

  console.log("Connected to MongoDB");
}

app.get("/health", (req, res) => {
  res.json({
    status: "OK"
  });
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await productsCollection.find().toArray();

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        message: "Name and price are required"
      });
    }

    const product = {
      name,
      price: Number(price),
      description: description || ""
    };

    const result = await productsCollection.insertOne(product);

    res.status(201).json({
      _id: result.insertedId,
      ...product
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create product"
    });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID"
      });
    }

    const updateData = {
      name,
      price: Number(price),
      description: description || ""
    };

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product updated successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update product"
    });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID"
      });
    }

    const result = await productsCollection.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete product"
    });
  }
});

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
