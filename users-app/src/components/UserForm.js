import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'

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
        <form id='form'>
            <TextField name='name' label='Name' value={values.name} onChange={handleChange} />
            <TextField name='bio' label='Bio' value={values.bio} onChange={handleChange} />
            <Button variant='contained' onClick={handleSubmit}>{props.action}</Button>
            <Button variant='contained' onClick={props.handleCancel}>Cancel</Button>
        </form>
    )
}

export default UserForm