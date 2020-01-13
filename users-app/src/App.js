import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@material-ui/core'

import UserList from './components/UserList'
import UserForm from './components/UserForm'

function App() {
  const [users, setUsers] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  console.log(users)

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
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <UserList users={users} deleteUser={deleteUser} />
      {!isAdding ?
        <Button variant='contained' onClick={() => setIsAdding(true)}>Add User</Button>
        : <UserForm action='Add User' handleSubmit={addUser} handleCancel={() => setIsAdding(false)} />
      }
    </div>
  );
}

export default App;
