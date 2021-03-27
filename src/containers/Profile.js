import API from '../api'
import ProfileReviews from '../components/ProfileReviews'
import UserAppointments from '../components/UserAppointments';
import {useRecoilState} from "recoil"
import {userState} from "../atoms"
import React, {useState} from 'react'
import ConversationList from './ConversationList';



export default function Profile(){
  const [user, setUser] = useRecoilState(userState),
        [isReviews, setIsReviews] = useState(false),
        [isAppointments, setIsAppointments] = useState(false),
        [isConvo, setIsConvo] = useState(false)



  function selectReviews(){
    setIsReviews(true)
    setIsAppointments(false)
    setIsConvo(false)
}

function selectAppointments() {
    setIsReviews(false)
    setIsAppointments(true)
    setIsConvo(false)
}

function selectConvos(){
  setIsConvo(true)
  setIsAppointments(false)
  setIsReviews(false)
}
  

  return(!!user.id &&
<div id="profile-container">
  <div className="profile-left" >
    <h1>Welcome, {user.first_name} {user.last_name} </h1>
        <div onClick={selectReviews}>My Reviews</div>
        <div onClick={selectAppointments}>My Appointments</div>
        <div onClick={selectConvos}>My Messages</div>
  </div>
  <div className="profile-right">
    {isReviews && <ProfileReviews/>}
    {isAppointments && <UserAppointments/>}
    {isConvo && <ConversationList/> }
  </div>
</div>
  )
}