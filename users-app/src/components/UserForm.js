import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Row, Col, Form as ReactForm, FormGroup, Input, Button } from 'reactstrap'

const Form = styled(ReactForm)`
    width: 100%;
`

const ButtonGroup = styled(FormGroup)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const initialValues = {
    name: '',
    bio: ''
}

const UserForm = props => {
    const [values, setValues] = useState(initialValues)

    useEffect(() => {
        if (props.userToEdit) {
            setValues({
                name: props.userToEdit.name,
                bio: props.userToEdit.bio
            })
        }
    }, [props.userToEdit])

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (!props.userToEdit) {
            props.handleSubmit(values)
        } else {
            props.handleSubmit(values, props.userToEdit.id)
        }

        setValues(initialValues)
        props.handleCancel()
    }

    return (
        <Row>
            <Col xs='12'>
                <Form>
                    <FormGroup>
                        <Input type='text' name='name' value={values.name} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Input type='text' name='bio' value={values.bio} onChange={handleChange} />
                    </FormGroup>
                    <ButtonGroup>
                        <Button onClick={handleSubmit}>{props.action}</Button>
                        <Button color='danger' onClick={props.handleCancel}>Cancel</Button>
                    </ButtonGroup>
                </Form>
            </Col>
        </Row>
    )
}

export default UserForm