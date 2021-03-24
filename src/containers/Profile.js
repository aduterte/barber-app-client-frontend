import API from '../api'
import ProfileReviews from '../components/ProfileReviews'
import UserAppointments from '../components/UserAppointments';
import {useRecoilState} from "recoil"
import {userState} from "../atoms"
import React, {useState} from 'react'



export default function Profile(){
  const [user, setUser] = useRecoilState(userState),
        [isReviews, setIsReviews] = useState(false),
        [isAppointments, setIsAppointments] = useState(false)



  function selectReviews(){
    setIsReviews(true)
    setIsAppointments(false)
}

function selectAppointments() {
    setIsReviews(false)
    setIsAppointments(true)
}
  

  return(!!user.id &&
<div>
    <h1>Welcome, {user.first_name} {user.last_name} </h1>
        <div onClick={selectReviews}>My Reviews</div>
        <div onClick={selectAppointments}>My Appointments</div>

    {isReviews && <ProfileReviews/>}
    {isAppointments && <UserAppointments/>}
</div>
  )
}