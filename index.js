const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.3gkgi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log('DB connected');
        const todoCollection = client.db("todo-app").collection("todos");

        //post todo
        app.post('/todos',async(req,res)=>{
            const todo = req.body;
            const result = await todoCollection.insertOne(todo);
            res.send(result);
        })
    }
    finally {
        //await client.close();
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`listening to ${port}`)
})
