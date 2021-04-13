import React, {useContext, useEffect, useState} from 'react';
import {conversationsAtom, convoSelector, openConvos as convoList} from "../atoms"
import {useRecoilState, useRecoilValue} from "recoil"
import { ActionCableContext } from '../index';
import MessagesContainer from '../containers/MessagesContainer';


export default function ConversationComponent(props){

    const [conversations, setConversations] = useRecoilState(conversationsAtom),
    [convo, setConvo] = useRecoilState(convoSelector(props.convo)),
    cable = useContext(ActionCableContext),
    [openConvos, setOpenConvos] = useRecoilState(convoList),
    [unread, setUnread] = useState(0)
  
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
    function addUnread(){
        // debugger
        if (openConvos.filter(c => c.id === convo.id).length === 0){
            // debugger
            setUnread(unread + 1)
        }
    }

    function showConvo(){
        setUnread(0)
        setOpenConvos([...openConvos, convo])
    }

    // console.log(openConvos)
    function displayUnread(){
        // debugger
        if (openConvos.filter(c => c.id === convo.id).length === 0 && unread > 0){
            return (<div className="count-badge">{unread}</div>)
        } else {
            return null
        }
    }
    return (
        <div>
         <div onClick={showConvo} className="convo-icon">
           <img src={convo.barber.photo} className="mini-avatar"/>
           {displayUnread()}
         </div>


           
                         
                
        </div>
    )
}