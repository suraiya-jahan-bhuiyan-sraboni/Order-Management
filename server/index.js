require('dotenv').config()
const express = require('express')
const app = express()
const cors = require("cors");
const port = 3000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(express.json())
app.use(cors())


const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    const db = client.db("orderdb")
    const ordersCollection = db.collection("orders")


    app.get("/allorders", async (req, res) => {
      const orders = await ordersCollection.find().toArray()
      res.send(orders.reverse())
    })

    app.get("/order/:id", async (req, res) => {
      const { id } = req.params
      const order = await ordersCollection.findOne({ _id: new ObjectId(id) })
      res.send(order)
    })
    app.post("/order", async (req, res) => {
      try {
        const order = req.body
        const result = await ordersCollection.insertOne(order);
        if (result.insertedId) {
          res.status(201).json({ message: "Order created successfully", orderId: result.insertedId });
        } else {
          res.status(500).json({ message: "Failed to create order" });
        }
      } catch (error) {
       // console.error("Error creating order:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }

    })



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello from order management dashboard!')
})

app.listen(port, () => {
  console.log(`Order management Dashboard listening on port ${port}`)
})
