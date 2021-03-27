import React from 'react';
import {userState, conversationsAtom} from "../atoms"
import {useRecoilValue} from "recoil"

import ConversationComponent from "../components/ConversationComponent"


export default function ConversationList(){

    const user = useRecoilValue(userState),
        conversations = useRecoilValue(conversationsAtom)
    // debugger
    return (
        <div>
            
            {user && conversations.map((convo,i) => <ConversationComponent key={`convo${convo.id}`} convo={convo} index={i}/>)}
           
        </div>
    )
}