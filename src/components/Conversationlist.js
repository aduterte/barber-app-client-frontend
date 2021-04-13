import React from 'react';
import {userState, conversationsAtom, openConvos} from "../atoms"
import {useRecoilValue} from "recoil"

import ConversationComponent from "./ConversationComponent"


export default function ConversationList(){

    const user = useRecoilValue(userState),
        conversations = useRecoilValue(conversationsAtom),
        convos = useRecoilValue(openConvos)
        
   
    return (
        <div>
           
            {user && conversations.map((convo,i) => <ConversationComponent key={`convo${convo.id}`} convo={convo} index={i}/>)}
           
        </div>
    )
}