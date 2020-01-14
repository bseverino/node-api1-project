import React, { useState } from 'react'
import styled from 'styled-components'
import { Col, Card, CardBody as ReactCardBody, Button as ReactButton } from 'reactstrap'

const CardBody = styled(ReactCardBody)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

const Button = styled(ReactButton)`
    width: 80px;
    margin-bottom: 10px;
`

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
                    <p>{props.user.bio}</p>
                    <div>
                        <Button onClick={handleEdit}>Edit</Button>{' '}
                        <Button color='danger' onClick={handleDelete}>Delete</Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default UserCard