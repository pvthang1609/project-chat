import React from 'react';

export default function ChatRoom({logout}) {
    return(
        <div>
            <p>ChatRoom</p>
            <button onClick={logout}>Log out</button>
        </div>
    )
}