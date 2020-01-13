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
            err.status(500).json({ errorMessage: 'The users information could not be retrieved.' })
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id

    Hubs.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' })
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
                res.status(500).json({ errorMessage: 'There was an error while saving the user to the database.' })
            })
    } else {
        res.status(500).json({ errorMessage: 'Please provide name and bio for the user.' })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    Hubs.remove(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' })
            } else {
                res.status(204).json(user)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'The user could not be removed.' })
        })
    
})

const port = 8000
server.listen(port, () => console.log(`\n ** server listening on port ${port} **\n`))