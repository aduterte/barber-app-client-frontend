import React, {useState, useEffect} from 'react'
import {useRecoilState} from "recoil"
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel} from '@syncfusion/ej2-react-schedule'
import '../index.css';
import {add} from 'date-fns'
import {approvedApptsState, userState} from "../atoms"
// import './read-only-events.css';




export default function Calendar(){
  const [startTime, setStartTime] = useState({}),
  [data, setData] = useState(null),
  [approvedAppts, setApprovedAppts]= useRecoilState(approvedApptsState),
  [scheduleObj, setScheduleObj] = useState(null),
  [ user, setUser ] = useRecoilState(userState)


useEffect(() => {
  const newData = []
  
  
  approvedAppts.length > 0 &&
    approvedAppts.map(appt=>
      approvedAppts[0].hasOwnProperty('barber') ?
    
    
            newData.push(
              {
              id: appt.id,
              EndTime: add( new Date(appt.date), { hours: 1}),
              StartTime: new Date(appt.date),
              Subject: `${appt.barber.username} hair cut`,
              IsReadonly: true,
              CategoryColor: "#357cd2"
              }
            )
        :
          newData.push(
            {
            id: appt.id,
            EndTime: add( new Date(appt.date), { hours: 1}),
            StartTime: new Date(appt.date),
            Subject: `${appt.client.username} hair cut`,
            IsReadonly: true,
            CategoryColor: "#357cd2"
            }
          )
        )
    setData(newData)

},[approvedAppts])

function onEventRendered(event) {
  let categoryColor = event.data.CategoryColor;
    event.element.style.backgroundColor = categoryColor;
}


  




return ( data&&

  <div className='schedule-control-section'>
    <div className='col-lg-12 control-section'>
      <div className='control-wrapper'>
        <ScheduleComponent currentView='Month' 
                          selectedDate= {new Date()}  
                          eventSettings={{dataSource: data}}
                          ref={t =>  setScheduleObj(t) }
                          eventRendered = {(e) => onEventRendered(e)}
                          >

          <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
        </ScheduleComponent>
      </div>
    </div>
  </div>

  )
}



 