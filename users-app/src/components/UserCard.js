import React, { useState } from 'react'
import styled from 'styled-components'
import { Col, Card, CardBody, Button } from 'reactstrap'

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
        <Col xs='3'>
            <Card>
                <CardBody>
                    <h4>{props.user.name}</h4>
                    <p>Bio: {props.user.bio}</p>
                    <Button onClick={handleEdit}>Edit</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </CardBody>
            </Card>
        </Col>
    )
}

export default UserCard