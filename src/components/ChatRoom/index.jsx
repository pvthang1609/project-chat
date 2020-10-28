import React from 'react';

export default function ChatRoom({logout, userName}) {
    return(
        <div>
            <p>ChatRoom</p>
            <p>{`Hello ${userName}`}</p>
        </div>
    )
}