import React, {useState, useEffect} from 'react'
import {useRecoilState} from "recoil"
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel} from '@syncfusion/ej2-react-schedule'
import '../index.css';
import {add} from 'date-fns'
import {approvedApptsState} from "../atoms"
// import './read-only-events.css';




export default function ClientCalendar(){
  const [startTime, setStartTime] = useState({})
  const [data, setData] = useState(null),
  [approvedAppts, setApprovedAppts]= useRecoilState(approvedApptsState)
  

useEffect(() => {

  let newData = []
  approvedAppts.map(appt=>
      newData.push(
        {
        id: appt.id,
        EndTime: add( new Date(appt.date), { hours: 1}),
        StartTime: new Date(appt.date),
        Subject: `${appt.barber.username} hair cut`,
        IsReadonly: true
        }
      )
    )
 
  setData(newData)

},[approvedAppts])


  
console.log("render")




return ( data&&

  <div className='schedule-control-section'>
  <div className='col-lg-12 control-section'>
    <div className='control-wrapper'>
      <ScheduleComponent currentView='Month' 
                         selectedDate= {new Date()}  
                         eventSettings={{dataSource: data}}
                         >

        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
      </ScheduleComponent>
    </div>
    </div>
      </div>

  )
}



 