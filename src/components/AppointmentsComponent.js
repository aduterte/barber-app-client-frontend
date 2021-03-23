import React, {useState} from 'react';
import {userState} from '../atoms'
import {useRecoilState} from 'recoil'
import API from "../api"
import AppointmentDetails from './AppointmentDetails';
import DateTimePicker from "react-datetime-picker"

export default function AppointmentsComponent(){

    const [user,setUser] = useRecoilState(userState),
          [date, setDate] = useState(new Date())
// debugger
    const makeAppointment = () => {
      // let date = new Date("April 1, 2021 03:00:00"),
      let data = {client_id: user.id, barber_id: 11, b_accepted:false, c_accepted:true, date:date, completed: false}
      API.post("/appointments", data)
      .then(res => {
          console.log(res.data)
      })
  }

    return(
      <div>
          appointments here
          <DateTimePicker minDate={new Date()} disableClock={true} onChange={setDate} value={date}/>
          <div>
              {`${date}`}
          </div>
          <div onClick={makeAppointment}>Test Appointment</div>
          {user && user.appointments.map(appt => <AppointmentDetails key={`app${appt.id}`} appt={appt}/>)}
      </div>
  )
}