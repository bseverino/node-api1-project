import React, { useState, useEffect } from 'react'
import axios from 'axios'

import UserList from './components/UserList'

function App() {
  const [users, setUsers] = useState([])
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

  return (
    <div>
      <UserList users={users} />
    </div>
  );
}

export default App;
