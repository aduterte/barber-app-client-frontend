import React, {useState} from 'react';
import ConversationList from '../components/Conversationlist';
import {openConvos} from "../atoms"
import {useRecoilState} from "recoil"
import MessagesContainer from '../containers/MessagesContainer';

export default function MessagesView(){

    const [showMessages, setShowMessages] = useState(false),
        [convos, setConvos] = useRecoilState(openConvos)

    function getDisplay(){
        if (showMessages) {
            return {display: "flex"}
        } else {
            return {display: "none"}
        }
    }
    return (
        <div id="messages-view">
            <div  className="message-boxes">
               { convos.map((convo, index) => <MessagesContainer key={convo.id} convo={convo} index={index}/>)}
            </div>
            <div className="conversation-list">
                <div className="messages-icon" onClick={()=>setShowMessages(!showMessages)}>
                <i className="material-icons" style={{fontSize:"26px"}}>message</i>

                </div>
                <div style={getDisplay()}>{ <ConversationList/>}</div>
                

            </div>
          
        </div>
    )
}