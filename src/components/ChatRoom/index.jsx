import React from 'react';


export default function ChatRoom({userName}) {
    return(
        <div>
            <p>ChatRoom</p>
            <p>{`Hello ${userName}`}</p>
        </div>
    )
}