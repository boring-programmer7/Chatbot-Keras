import React from 'react'
import BotMessage from './BotMessage'
import PersonMessage from './PersonMessage'

function Messages({ msgRes }) {
    const msgs = msgRes
    
    return (
        <div className="msg_res">
            {msgs.map((msg,_id) => (
                <div key={_id}>
                    {msg.id === "bot777" ? (
                        <BotMessage message={msg.message}/>
                    ) : (
                            <PersonMessage message={msg.message}/>
                 )}   
                </div>
            ))}
        </div>
    )
}

export default Messages
