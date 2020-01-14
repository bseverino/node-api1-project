import React from 'react'
import { Row } from 'reactstrap'

import UserCard from './UserCard'

const UserList = props => {
    return (
        <Row>
            {props.users.map(user => (
                <UserCard
                    {...props}
                    key={user.id}
                    user={user}
                />
            ))}
        </Row>
    )
}

export default UserList