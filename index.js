// implement your API here
const express = require('express')
const Hubs = require('./data/db.js')
const server = express()
server.use(express.json())

server.get('/api/users', (req, res) => {
    Hubs.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            err.status(500).json({ errorMessage: 'Sorry, we ran into an error getting the list of users.' })
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id

    Hubs.findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'Sorry, we ran into an error getting that user.' })
        })
})

server.post('/api/users', (req, res) => {
    const userData = req.body

    if (userData['name'] && userData['bio']) {
        Hubs.insert(userData)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ errorMessage: 'Sorry, we ran into an error creating the user.' })
            })
    } else {
        res.status(500).json({ errorMessage: 'Please provide name and bio for the user.' })
    }
})

const port = 8000
server.listen(port, () => console.log(`\n ** server listening on port ${port} **\n`))