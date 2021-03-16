import axios from 'axios';
import ReviewForm from './ReviewForm'
import {useState ,useEffect} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import {selectedBarberState, 
        clientsState} from '../atoms'




function BarberDetail() {

  const [selectedBarber, setSelectedBarber] = useRecoilState(selectedBarberState),
  client = useRecoilValue(clientsState)
  const [reviewToggle, setReviewToggle] = useState(false)



  useEffect(() => {
   
const str = window.location.pathname;
const n = str.lastIndexOf('/');
const index = str.substring(n + 1);

axios.get(`http://localhost:3000/barbers/${index}`)
.then(res => setSelectedBarber(res.data))
  },[setSelectedBarber])

 
  
  return ( !selectedBarber ? null : (
  <div>
    <h1>Profile Page for {selectedBarber.first_name} {selectedBarber.last_name} </h1>
    <h4>email: {selectedBarber.email}</h4>
    <button onClick = {() => setReviewToggle(!reviewToggle)}>leave review</button>
    {!reviewToggle ? null:
    <ReviewForm/>} 


    {selectedBarber.barber_reviews.map(review=>
      <div key={review.id}>
          <div >"{review.content}"</div>
          <div>- {client.find(c=> review.client_id === c.id).username}</div>
          <button > edit</button>
      </div>    
    )} 

  </div>
  )
  )
  
    }

export default BarberDetail
    