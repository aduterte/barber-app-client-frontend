import API from '../api'


import BarberReviews from '../components/BarberReviews'
import BarberAppointments from '../components/BarberAppointments';


import {useState ,useEffect} from 'react'



export default function BarberDetail() {

  const [selectedBarber, setSelectedBarber] = useState({}),
        [isReviews, setIsReviews] = useState(false),
        [isAppointments, setIsAppointments] = useState(false)
       



  useEffect(() => {
   
    const str = window.location.pathname;
    const n = str.lastIndexOf('/');
    const index = str.substring(n + 1);

    API.get(`/barbers/${index}`)
     .then(res => setSelectedBarber(res.data) )

  },[setSelectedBarber])

  function selectReviews(){
    setIsReviews(true)
    setIsAppointments(false)
}

function selectAppointments() {
    setIsReviews(false)
    setIsAppointments(true)
}

  console.log("selectedBarber",selectedBarber.id)

  return ( !!selectedBarber.id &&
    
  <div>
    <div>
    <h1>Profile Page for {selectedBarber.first_name} {selectedBarber.last_name} </h1>
    <h4>email: {selectedBarber.email}</h4>
        <div onClick={selectReviews}>My Reviews</div>
        <div onClick={selectAppointments}>My Appointments</div>
    {isReviews && <BarberReviews 
                    selectedBarber= {selectedBarber} 
                    setSelectedBarber= {setSelectedBarber}/>}
    {isAppointments &&<BarberAppointments selectedBarber= {selectedBarber} />}
      </div>
</div>
)
  
    }

    