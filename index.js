// implement your API here
const express = require('express')
const Hubs = require('./data/db.js')
const server = express()
server.use(express.json())

server.get('/api/hubs', (req, res) => {
    Hubs.find()
        .then(hubs => {
            res.status(200).json(hubs)
        })
        .catch(err => {
            console.log(err)
            err.status(500).json({ errorMessage: 'Sorry, we ran into an error getting the list of hubs' })
        })
})

server.get('/api/hubs/:id', (req, res) => {
    const id = req.params.id

    Hubs.findById(id)
        .then(hub => {
            res.status(200).json(hub)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'Sorry, we ran into an error getting that hubs' })
        })
})

const port = 8000
server.listen(port, () => console.log(`\n ** server listening on port ${port} **\n`))