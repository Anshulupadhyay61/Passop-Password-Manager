require('dotenv').config()

const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    console.error('❌ MONGO_URI is not configured')
    process.exit(1)
}

app.use(cors())
app.use(express.json())

const client = new MongoClient(MONGO_URI)

async function main() {
    try {
        await client.connect()

        console.log('MongoDB Connected ✅')

        const db = client.db('passop')
        const collection = db.collection('documents')

        // GET - Fetch all passwords
        app.get('/', async (req, res) => {
            try {
                const data = await collection
                    .find({})
                    .project({ _id: 0 })
                    .toArray()

                res.json(data)
            } catch (error) {
                console.error('GET Error:', error)
                res.status(500).json({
                    error: 'Failed to fetch passwords'
                })
            }
        })

        // POST - Save password
        app.post('/', async (req, res) => {
            try {
                const { id, site, username, password } = req.body

                if (!id || !site || !username || !password) {
                    return res.status(400).json({
                        error: 'All fields are required'
                    })
                }

                const newEntry = {
                    id,
                    site,
                    username,
                    password
                }

                await collection.insertOne(newEntry)

                res.status(201).json(newEntry)
            } catch (error) {
                console.error('POST Error:', error)
                res.status(500).json({
                    error: 'Failed to save password'
                })
            }
        })

        // PUT - Update password
        app.put('/:id', async (req, res) => {
            try {
                const { id } = req.params
                const { site, username, password } = req.body

                if (!site || !username || !password) {
                    return res.status(400).json({
                        error: 'All fields are required'
                    })
                }

                const updatedEntry = {
                    id,
                    site,
                    username,
                    password
                }

                const result = await collection.updateOne(
                    { id },
                    { $set: updatedEntry }
                )

                if (result.matchedCount === 0) {
                    return res.status(404).json({
                        error: 'Password not found'
                    })
                }

                res.json(updatedEntry)
            } catch (error) {
                console.error('PUT Error:', error)
                res.status(500).json({
                    error: 'Failed to update password'
                })
            }
        })

        // DELETE - Delete password
        app.delete('/:id', async (req, res) => {
            try {
                const { id } = req.params

                const result = await collection.deleteOne({ id })

                if (result.deletedCount === 0) {
                    return res.status(404).json({
                        error: 'Password not found'
                    })
                }

                res.json({
                    success: true,
                    message: 'Password deleted successfully'
                })
            } catch (error) {
                console.error('DELETE Error:', error)
                res.status(500).json({
                    error: 'Failed to delete password'
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