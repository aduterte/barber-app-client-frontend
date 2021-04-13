import API from '../api'


import BarberReviews from '../components/BarberReviews'
import BarberAppointments from '../components/BarberAppointments';
import {userState, conversationsAtom} from "../atoms"
import {useRecoilValue, useRecoilState} from "recoil"
import { ActionCableContext } from '../index.js'
import {useContext, useState ,useEffect} from 'react'
import userEvent from '@testing-library/user-event';
// import { ActionCableContext } from '..';



export default function BarberDetail() {

  const [selectedBarber, setSelectedBarber] = useState({}),
        [isReviews, setIsReviews] = useState(false),
        [isAppointments, setIsAppointments] = useState(false),
        user = useRecoilValue(userState),
        [conversations, setConversations] = useRecoilState(conversationsAtom),
        cable = useContext(ActionCableContext),
        [channel, setChannel] = useState(null)
       
  useEffect(()=>{
  // debugger
    const channel = cable.subscriptions.create({
        channel: 'ConversationsChannel'
    })
    setChannel(channel)
    return ()=>{
        channel.unsubscribe()
    }
  },[setChannel, cable.subscriptions])

  useEffect(() => {
   
    const str = window.location.pathname;
    const n = str.lastIndexOf('/');
    const index = str.substring(n + 1);

    API.get(`/barbers/${index}`)
    .then(res => setSelectedBarber(res.data) )

  },[setSelectedBarber])

  function selectReviews(){
    setIsReviews(true)
    setIsAppointments(false)
}

function selectAppointments() {
    setIsReviews(false)
    setIsAppointments(true)
}

  function messageBarber(){
    const data = {barber_id: selectedBarber.id, client_id: user.id}
    channel.send(data)
  }

  return ( !!selectedBarber.id &&
    
  <div>
    <div>
    <h1>Profile Page for {selectedBarber.first_name} {selectedBarber.last_name} </h1>
    <h4>email: {selectedBarber.email}</h4>
        <div onClick={selectReviews}>My Reviews</div>
        <div onClick={selectAppointments}>My Appointments</div>
    {isReviews && <BarberReviews 
                    selectedBarber= {selectedBarber} 
                    setSelectedBarber= {setSelectedBarber}/>}
    {isAppointments && <BarberAppointments selectedBarber= {selectedBarber} />}
      </div>
      <div onClick={messageBarber}>
        PLACEHOLDER MESSAGE BARBER (Pop up MOdal?)
      </div>
</div>
)
  
    }

    