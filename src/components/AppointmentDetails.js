import React from 'react';

export default function AppointmentDetails(props){

    const {barber, date} = props.appt
console.log(props.appt.username)
    return (
        <div className="appointment-card">
            <div className="appointment-card-top">
                <img src={barber.photo} alt="barber photo" className="mini-avatar"/>
            <div>Appointment with {barber.username}</div>
            </div>
            <div>{`${new Date(date)}`}</div>
        </div>
    )
}