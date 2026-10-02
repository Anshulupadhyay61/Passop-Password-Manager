require('dotenv').config()

const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')

const app = express()

// Environment variables
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    console.error('❌ MONGO_URI is not configured')
    process.exit(1)
}

// Middleware
app.use(cors())
app.use(express.json())

const client = new MongoClient(MONGO_URI)

async function main() {
    try {
        await client.connect()

        console.log('MongoDB Connected ✅')

        const db = client.db('passop')
        const collection = db.collection('documents')

        // POST
        app.post('/', async (req, res) => {
            try {
                console.log(req.body)

                const result = await collection.insertOne(req.body)

                res.send(result)
            } catch (error) {
                console.error('POST Error:', error)
                res.status(500).json({
                    error: 'Failed to save data'
                })
            }
        })

        // GET
        app.get('/', async (req, res) => {
            try {
                const data = await collection.find({}).toArray()

                res.json(data)
            } catch (error) {
                console.error('GET Error:', error)
                res.status(500).json({
                    error: 'Failed to fetch data'
                })
            }
        })

        // Health check
        app.get('/health', (req, res) => {
            res.json({
                status: 'ok',
                message: 'Passop Backend is running 🚀'
            })
        })

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server Running on port ${PORT} 🚀`)
        })

    } catch (error) {
        console.error('❌ Server startup failed:', error)
        process.exit(1)
    }
}

main()