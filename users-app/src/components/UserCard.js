import React from 'react'
import { Card, CardContent, Button } from '@material-ui/core'

const UserCard = props => {
    const handleDelete = () => {
        props.deleteUser(props.user.id)
    }

    return (
        <Card>
            <CardContent>
                <h3>Name: {props.user.name}</h3>
                <p>Bio: {props.user.bio}</p>
                <Button>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </CardContent>
        </Card>
    )
}

export default UserCard