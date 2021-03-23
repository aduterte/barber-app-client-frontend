import React, {useState} from 'react';
import {userState} from '../atoms'
import {useRecoilState} from 'recoil'
import API from "../api"
import AppointmentDetails from './AppointmentDetails';
import DateTimePicker from "react-datetime-picker"
// dannys schedualer app
// import {Inject, ScheduleComponent, Day,Week, Month, Agenda, EventSettingsModel} from '@syncfusion/ej2-react-schedule'

export default function UserAppointmentsComponent(){

    const [user,setUser] = useRecoilState(userState),
          [date, setDate] = useState(new Date())
    
    function acceptAppt(appt){
      console.log(appt)
      API.patch(`/appointments/${appt.id}`,{c_accepted: true, b_accepted: true, date: appt.date, client_id:user.id})
      .then(res=> setUser(res.data))
    }
          

       
          console.log(user.appointments)
      
      return( user&&
        <div>
            
          
            <DateTimePicker minDate={new Date()} disableClock={true} onChange={setDate} value={date}/>
            
            <div>
                {`${date}`}
            </div>
              <p></p>
              <p></p>
            <div>Waiting on Confirmation from Barber</div>
              {user.appointments.filter(appt=>appt.b_accepted===false).map(appt => 
                <div>
                  <button onClick={()=>acceptAppt(appt)}>Accept appointment:</button>
                  <AppointmentDetails key={`app${appt.id}`} appt={appt}/>
                </div>
                )}
            <p></p>
            <p></p>
            <div>Confirmed Appointments</div>
            {user.appointments.filter(appt => appt.b_accepted===true && appt.c_accepted===true).map(appt => <AppointmentDetails key={`app${appt.id}`} appt={appt}/>)}
            
        
        </div>
    )
  }

   
