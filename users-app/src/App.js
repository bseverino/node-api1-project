import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Container as ReactContainer, Button } from 'reactstrap'

import UserList from './components/UserList'
import UserForm from './components/UserForm'

const Container = styled(ReactContainer)`
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  const [users, setUsers] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [userToEdit, setUserToEdit] = useState(null)
  console.log(users)
  console.log(userToEdit)

  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const deleteUser = id => {
    axios.delete(`http://localhost:8000/api/users/${id}`)
      .then(res => {
        console.log(res)
        const newUsers = users.filter(user => user.id !== id)
        setUsers(newUsers)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const addUser = user => {
    axios.post('http://localhost:8000/api/users', user)
      .then(res => {
        console.log(res)
        axios.get('http://localhost:8000/api/users')
          .then(res => {
            setUsers(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const startEdit = user => {
    setIsEditing(true)
    setUserToEdit(user)
    window.scrollTo(0, 0)
  }
  
  const cancelEdit = () => {
    setIsEditing(false)
    setUserToEdit(null)
  }

  const editUser = (user, id) => {
    axios.put(`http://localhost:8000/api/users/${id}`, user)
      .then(res => {
        console.log(res)
        axios.get('http://localhost:8000/api/users')
          .then(res => {
            setUsers(res.data)
          })
          .catch(err => {
            console.log(err)
          })       
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Container>      
      {isEditing && <UserForm action='Edit User' handleSubmit={editUser} handleCancel={cancelEdit} userToEdit={userToEdit} />}

      <UserList users={users} deleteUser={deleteUser} startEdit={startEdit} />

      {!isAdding ?
        <Button onClick={() => setIsAdding(true)}>Add User</Button>
        : <UserForm action='Add User' handleSubmit={addUser} handleCancel={() => setIsAdding(false)} />
      }      
    </Container>
  );
}

export default App;
