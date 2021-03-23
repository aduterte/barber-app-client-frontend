import API from '../api'
import Reviews from '../components/Reviews'
import AppointmentsComponent from '../components/AppointmentsComponent';
import {useRecoilValue} from "recoil"
import {userState} from "../atoms"
import React, {useState , useEffect} from 'react'



export default function Profile(){
  const [selectedClient, setSelectedClient] = useState({}),
         user = useRecoilValue(userState),
        [isReviews, setIsReviews] = useState(false),
        [isAppointments, setIsAppointments] = useState(false)

  useEffect(() => {
   
    const str = window.location.pathname;
    const n = str.lastIndexOf('/');
    const index = str.substring(n + 1);

    API.get(`/clients/${index}`)
    .then(res => setSelectedClient(res.data) )

  },[setSelectedClient])

  function selectReviews(){
    setIsReviews(true)
    setIsAppointments(false)
}

function selectAppointments() {
    setIsReviews(false)
    setIsAppointments(true)
}
  
 

  return(!!selectedClient.id &&
<div>
    <h1>Welcome, {selectedClient.first_name} {selectedClient.last_name} </h1>
        <div onClick={selectReviews}>My Reviews</div>
        <div onClick={selectAppointments}>My Appointments</div>

    {isReviews && <Reviews 
                    selectedClient = {selectedClient}
                    setSelectedClient = {setSelectedClient}/>}
    {isAppointments && <AppointmentsComponent/>}
</div>
  )
}