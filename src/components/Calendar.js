import React, {useState, useEffect} from 'react'
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel} from '@syncfusion/ej2-react-schedule'
import {add} from 'date-fns'

export default function Calendar(props){
  const [startTime, setStartTime] = useState({})

  
function addHour(){

  let hour = props.appts[0].date.split('T')[1].substring(0, 2)
  return parseInt(hour) + 1 
}

// function setStartTime(){
//   
//   const startTime = {
//     year: parseInt(mYSplit[0]),
//     month: parseInt(mYSplit[1]) - 1}}

    // useEffect(() => {
    //   // console.log(props.appts)
    //  for (let i =0; i<props.appts.length;i++){
    //   const mYSplit = props.appts[0].date.split('-'),
    //   hourMin = 
    //    props.appts[i] = {
    //      ...props.appts,
    //      startTime: "now",
    //      endTime: "later"
    //    }
    
    //  }
       
    
    // },[])
    
    
//   }


// }

// const result = add(new Date(2014, 8, 1, 10, 19, 50), {
//   years: 2,
//   months: 9,
//   weeks: 1,
//   days: 7,
//   hours: 5,
//   minutes: 9,
//   seconds: 30,
// })
    
  return (props.appts[0]? 
   
    
  <div>
  
       {props.appts.map(appt=>
    <div key ={`test${appt.id}`}>
    <ScheduleComponent currentView='Month' selectedDate= {new Date()} 
      eventSettings={localStorage.EventSettingsModel = {
        dataSource: [{
          EndTime: add( new Date(appt.date), { hours: 1}),
          StartTime: new Date(appt.date)
        }]
      }}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
    </ScheduleComponent>
    </div>
) }
  </div> : null
  
  )
}



 