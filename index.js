const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.noswvlt.mongodb.net/?retryWrites=true&w=majority`;

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
        const ProductCollection = client.db("ProductManageDB").collection("products");
        //Product realated API
        app.get('/products', async (req, res) => {
            
            const products = await ProductCollection.find().toArray();
            res.send(products);
        });
        app.get('/Details', async (req, res) => {
            
                const id = req.params.id;
                const query = { _id: new ObjectId(id) }
                const result = await ProductCollection.findOne(query);
                res.send(result);
        });

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
    res.send('SERVER is Running');

})
app.listen(port, () => {
    console.log(` web server is running port${port}`)
})