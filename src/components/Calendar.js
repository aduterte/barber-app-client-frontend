import React, {useState, useEffect} from 'react'
import {useRecoilState} from "recoil"
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel} from '@syncfusion/ej2-react-schedule'
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'
import {add} from 'date-fns'
import {apptsState} from "../atoms"


export default function Calendar(props){
  const [startTime, setStartTime] = useState({})
  const [data, setData] = useState(null),
  [appts,setAppts]= useRecoilState(apptsState)

  
function addHour(){

  let hour = props.appts[0].date.split('T')[1].substring(0, 2)
  return parseInt(hour) + 1 
}


useEffect(() => {
  let newData = []
    appts.map(appt=>
      newData.push(
        {
        id: appt.id,
        EndTime: add( new Date(appt.date), { hours: 1}),
        StartTime: new Date(appt.date),
        Subject: appt.id
        }
      )
    )

  setData(newData)

},[appts])




  return ( data&&

    <div>
      <ScheduleComponent currentView='Month' selectedDate= {new Date()}  eventSettings={{dataSource: data}}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
      </ScheduleComponent>
    </div>
    


  )
}



 