import React from 'react'
import { Card, CardContent, Button } from '@material-ui/core'

const UserCard = ({ user }) => {
    return (
        <Card>
            <CardContent>
                <h3>Name: {user.name}</h3>
                <p>Bio: {user.bio}</p>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </CardContent>
        </Card>
    )
}

export default UserCard