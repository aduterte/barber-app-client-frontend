import React, {useContext, useState, useEffect} from 'react';
import {userState, conversationsAtom} from "../atoms"
import {useRecoilValue, useRecoilState} from "recoil"
import { ActionCableContext } from '../index.js'
import ConversationComponent from "../components/ConversationComponent"


export default function ConversationList(){

    const cable = useContext(ActionCableContext),
        user = useRecoilValue(userState),
        [conversations, setConversations] = useRecoilState(conversationsAtom)
        
    return (
        <div>
            
            {user && conversations.map((convo,i) => <ConversationComponent key={`convo${convo.id}`} convo={convo} index={i}/>)}
           
        </div>
    )
}