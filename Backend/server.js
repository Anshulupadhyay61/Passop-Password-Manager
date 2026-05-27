const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

const url = 'mongodb://localhost:27017'

const client = new MongoClient(url)

async function main() {

    await client.connect()

    console.log("MongoDB Connected ✅")

    const db = client.db('passop')

    const collection = db.collection('documents')

    // POST
    app.post('/', async (req, res) => {

        console.log(req.body)

        const result = await collection.insertOne(req.body)

        res.send(result)
    })

    // GET
    app.get('/', async (req, res) => {

        const data = await collection.find({}).toArray()

        res.json(data)
    })

    app.listen(3000, () => {
        console.log("Server Running 🚀")
    })
}

main()