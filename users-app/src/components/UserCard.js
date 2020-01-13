import React, { useState } from 'react'
import { Card, CardContent, Button } from '@material-ui/core'

const UserCard = props => {
    const [isEditing, setIsEditing] = useState(false)

    const handleDelete = () => {
        props.deleteUser(props.user.id)
    }

    const handleEdit = () => {
        setIsEditing(true)
        props.startEdit(props.user)
    }

    return (
        <Card>
            <CardContent>
                <h3>Name: {props.user.name}</h3>
                <p>Bio: {props.user.bio}</p>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </CardContent>
        </Card>
    )
}

export default UserCard