import React, {useEffect, useState} from 'react';
import {userState, approvedApptsState} from '../atoms'
import {useRecoilState} from 'recoil'
import API from "../api"
import AppointmentDetails from './AppointmentDetails';
import Calendar from './Calendar'
import DateTimePicker from "react-datetime-picker"
// dannys schedualer app
// import {Inject, ScheduleComponent, Day,Week, Month, Agenda, EventSettingsModel} from '@syncfusion/ej2-react-schedule'

export default function UserAppointmentsComponent(){

    const [user,setUser] = useRecoilState(userState),
          [date, setDate] = useState(new Date()),
          [approvedAppts, setApprovedAppts]= useRecoilState(approvedApptsState)
          
    
    function acceptAppt(appt){
      API.patch(`/appointments/${appt.id}`,{c_accepted: true, b_accepted: true, date: appt.date})
      .then(res=> {
        let filteredAppts = user.appointments.filter(oldAppts => oldAppts.id !== appt.id)
        setUser({...user, appointments: [...filteredAppts,res.data]})
      })
    }

    function handleDelete(appt){
    API.delete(`/appointments/${appt.id}`)
      let filteredAppts = user.appointments.filter(oldAppts => oldAppts.id !== appt.id)
      setUser({...user, appointments: [...filteredAppts]})
    }  
  //  console.log(user)
    
  useEffect(() => {
    setApprovedAppts(user.appointments.filter(appt => appt.b_accepted===true && appt.c_accepted===true))
  
  },[setApprovedAppts])
     
        


       
          // console.log(user)
      
      return( user.appointments &&
        <div>
            
            <Calendar />
            <DateTimePicker minDate={new Date()} disableClock={true} onChange={setDate} value={date}/>
                
                <div>
                    {`${date}`}
                </div>
                      <p></p>
                      <p></p>
                        <div>Waiting for your confirmation</div>
                          {user.appointments.filter(appt=>appt.c_accepted===false).map(appt => 
                            <div key = {appt.id}>
                              <button onClick={()=>acceptAppt(appt)}>Accept Appointment:</button>
                              <button onClick={()=>handleDelete(appt)}>Decline Appointment</button>
                              <AppointmentDetails key={`app${appt.id}`} appt={appt}/>
                            </div>
                            )}
                    <p></p>
                    <p></p>
            <div>Confirmed Appointments</div>
                {approvedAppts.map(appt => <AppointmentDetails key={`app${appt.id}`} appt={appt}/>)}
            
        
        </div>
    )
  }

   
