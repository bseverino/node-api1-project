import React from 'react'

import UserCard from './UserCard'

const UserList = props => {
    return (
        <div>
            {props.users.map(user => (
                <UserCard
                    {...props}
                    key={user.id}
                    user={user}
                />
            ))}
        </div>
    )
}

export default UserList