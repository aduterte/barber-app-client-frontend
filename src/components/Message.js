import React from 'react';



export default function Message(props){

    const {message} = props
   
    function getSender(){
        if (message.sent_by === "client"){
            return "You"
        } else {
            return message.barber.username
        }
    }

return (
    <div>
        {/* List of Conversations */}
       <div>{getSender()} said:</div>
       <div>{message.text}</div>
        
        {/* <ActionCableConsumer channel={{channel: 'RoomsChannel'}} onReceived={handleRecievedRoom}/> */}
    </div>
)
}
