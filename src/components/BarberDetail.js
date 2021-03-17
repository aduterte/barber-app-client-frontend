import axios from 'axios';
import ReviewForm from './ReviewForm'
import {useState ,useEffect} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import {selectedBarberState, 
        clientsState,
        userState} from '../atoms'




function BarberDetail() {

  const [selectedBarber, setSelectedBarber] = useRecoilState(selectedBarberState),
        client = useRecoilValue(clientsState),
        [newReviewToggle, setNewReviewToggle] = useState(false),
        [editReviewToggle, setEditReviewToggle] = useState(false),
        user = useRecoilValue(userState)



  useEffect(() => {
   
const str = window.location.pathname;
const n = str.lastIndexOf('/');
const index = str.substring(n + 1);

axios.get(`http://localhost:3000/barbers/${index}`)
.then(res => setSelectedBarber(res.data))
  },[setSelectedBarber])

 function handleDelete(e,id){
   e.preventDefault()
  axios.delete(`http://localhost:3000/barber_reviews/${id}`)
  .then(setSelectedBarber({...selectedBarber, barber_reviews: [...selectedBarber.barber_reviews.filter(r=> r.id !== id)]}));
  }


  
  return ( !selectedBarber ? null : (
  <div>
    <h1>Profile Page for {selectedBarber.first_name} {selectedBarber.last_name} </h1>
    <h4>email: {selectedBarber.email}</h4>
    <button onClick = {() => setNewReviewToggle(!newReviewToggle)}>leave review</button>
    {!newReviewToggle ? null:
    <ReviewForm/>} 


    {selectedBarber.barber_reviews.map(review=>
      <div key={review.id}>
          <div>"{review.content}"</div>
          <div>- {client.find(c=> review.client_id === c.id).username}</div>
          {!review.client_id === user.id? null :
          <div>
            <button onClick = {() => setEditReviewToggle(!newReviewToggle)}> edit</button>
            <button onClick = {(e)=> handleDelete(e,review.id)}>Delete</button>
            {!editReviewToggle ? null:
              <ReviewForm/>} 
          </div>
           }
          
      </div>    
    )} 

  </div>
  )
  )
  
    }

export default BarberDetail
    