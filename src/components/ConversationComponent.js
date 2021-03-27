import React, {useContext, useEffect} from 'react';
import {conversationsAtom, convoSelector} from "../atoms"
import {useRecoilState, useRecoilValue} from "recoil"
import { ActionCableContext } from '../index';
import MessagesContainer from '../containers/MessagesContainer';


export default function ConversationComponent(props){

    const [conversations, setConversations] = useRecoilState(conversationsAtom),
        convo = useRecoilValue(convoSelector(props.convo.id)),
        cable = useContext(ActionCableContext)
  
    useEffect(()=>{
        cable.subscriptions.create(
            {channel: 'MessagesChannel', id: props.convo.id},
            {received: (data) => {
                console.log(data)
                let array = [...conversations]
                array[props.index] = {...array[props.index], messages: [...convo.messages, data]}
                setConversations(array)
            }}
            )
    })
    // console.log(convo)
    return (
        <div>
         Conversation with {convo.barber.username}

                <MessagesContainer convo={convo}/>
                
        </div>
    )
}