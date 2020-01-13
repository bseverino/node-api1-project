// implement your API here
const express = require('express')
const Hubs = require('./data/db.js')
const server = express()
server.use(express.json())

// returns a list of users
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

// returns a specific user by id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id

    Hubs.findById(id)
        .then(user => {
            // check if id exists
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

// adds a user
server.post('/api/users', (req, res) => {
    const userData = req.body

    // check if both name and bio exist
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
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    }
})

// deletes a user by id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    Hubs.remove(id)
        .then(user => {
            // check if id exists
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

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const userData = req.body

    // check if both name and bio exist
    if (userData['name'] && userData['bio']) {
        Hubs.update(id, userData)
            .then(user => {
                // check if id exists
                if (!user) {
                    res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' })
                } else {
                    res.status(200).json(user)
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ errorMessage: 'The user information could not be modified.' })
            })
    } else {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    }
})

const port = 8000
server.listen(port, () => console.log(`\n ** server listening on port ${port} **\n`))