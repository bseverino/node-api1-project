import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'

const initialValues = {
    name: '',
    bio: ''
}

const UserForm = props => {
    const [values, setValues] = useState(initialValues)

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.handleSubmit(values)
        setValues(initialValues)
        props.handleCancel()
    }

    return (
        <form>
            <TextField name='name' label='Name' value={values.name} onChange={handleChange} />
            <TextField name='bio' label='Bio' value={values.bio} onChange={handleChange} />
            <Button variant='contained' onClick={handleSubmit}>{props.action}</Button>
            <Button variant='contained' onClick={props.handleCancel}>Cancel</Button>
        </form>
    )
}

export default UserForm