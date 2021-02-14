import React from 'react'

function BotMessage({ message }) {
    const imgUrl='https://firebasestorage.googleapis.com/v0/b/superchat-c8496.appspot.com/o/comegalletas.png?alt=media&token=1cb48af5-66f0-44ce-962b-14e63a720dba'
    return (
        <div className="bot_message">

            <img src={imgUrl} alt='botMessage'></img>
            <div className="bot_text">
                {message}
            </div>
        </div>
    )
}

export default BotMessage
