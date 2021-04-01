import React, {useState, useEffect} from 'react'
import {useRecoilState} from "recoil"
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel} from '@syncfusion/ej2-react-schedule'
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'
import {add} from 'date-fns'
import {approvedApptsState} from "../atoms"


export default function Calendar(props){
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
        Subject: `${appt.barber.username} hair cut`
        }
      )
    )

  setData(newData)

},[approvedAppts])


console.log(approvedAppts)

return ( data&&

    <div>
      <ScheduleComponent currentView='Month' selectedDate= {new Date()}  eventSettings={{dataSource: data}}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
      </ScheduleComponent>
    </div>

  )
}



 