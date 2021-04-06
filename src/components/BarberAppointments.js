
 
  import React, {useState, useEffect} from 'react';
  import {userState, approvedApptsState} from '../atoms'
  import {useRecoilState} from 'recoil'
  import API from "../api"
  import AppointmentDetails from './AppointmentDetails';
  import Calendar from './Calendar'
  import DateTimePicker from "react-datetime-picker"
  // dannys schedualer app
  // import {Inject, ScheduleComponent, Day,Week, Month, Agenda, EventSettingsModel} from '@syncfusion/ej2-react-schedule'
  

  export default function BarberAppointments(props){
      const [user,setUser] = useRecoilState(userState),
            [date, setDate] = useState(new Date()),
            [approvedAppts, setApprovedAppts]= useRecoilState(approvedApptsState)


    useEffect(() => {
      setApprovedAppts(user.appointments.filter(appt => appt.b_accepted===true && appt.c_accepted===true))
    
    },[setApprovedAppts])
    console.log(approvedAppts)
  // debugger
    const makeAppointment = () => {
      // let date = new Date("April 1, 2021 03:00:00"),
      let data = {client_id: user.id, barber_id: props.selectedBarber.id, b_accepted:false, c_accepted:true, date:date, completed: false}
      API.post("/appointments", data)
      .then(res => {
          setUser({...user, appointments: [...user.appointments, res.data]})
          console.log(res.data)
      })
    }

   
  

    function waitingOnConfirmation(){
      const myAppts = user.appointments.filter(a=> a.barber.id === props.selectedBarber.id)
      return myAppts.filter(appt=>appt.b_accepted===false)
    }


 
  
      return( user&&
        <div>
          <Calendar/>
            <DateTimePicker minDate={new Date()} disableClock={true} onChange={setDate} value={date}/>
           
            <div>
              
                {!user.appointments.filter(a=> a.barber.id === props.selectedBarber.id).length > 0 &&
                <div onClick={makeAppointment}>Create an appointment with {props.selectedBarber.first_name} for: {`${date}`} </div>
                }
            </div>
            <p></p>
            <p></p>
            <div>Waiting on Confirmation from Barber</div>
            <p></p>
            {waitingOnConfirmation().map(appt => <AppointmentDetails key={`app${appt.id}`} appt={appt}/>)}
           
            
       
        </div>
    )
  }
  
