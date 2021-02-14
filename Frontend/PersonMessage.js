import React from 'react'

function PersonMessage({ message }) {
   
    return (
        <div className="person_message">
            <div className="person_text">
                {message}
            </div>
        </div>
    )
}

export default PersonMessage
