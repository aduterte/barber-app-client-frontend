import API from '../api'
import axios from 'axios';
import BarberReviewForm from './BarberReviewForm'

import {useState ,useEffect} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import {selectedBarberState, 
        clientsState,
        userState} from '../atoms'

function BarberDetail() {

  const [selectedBarber, setSelectedBarber] = useRecoilState(selectedBarberState),
        client = useRecoilValue(clientsState),
        [reviewToggle, setReviewToggle] = useState(false),
        [input, setInput] = useState({content: "", rating: 0}),
        [editing,setEditing] = useState({}),
        user = useRecoilValue(userState)




  useEffect(() => {
   
    const str = window.location.pathname;
    const n = str.lastIndexOf('/');
    const index = str.substring(n + 1);

    API.get(`/barbers/${index}`)
    .then(res => setSelectedBarber(res.data) )

  },[setSelectedBarber])

  


 function handleDelete(e,id){
    e.preventDefault()
    axios.delete(`http://localhost:3000/barber_reviews/${id}`)
    .then(setSelectedBarber({...selectedBarber, barber_reviews: [...selectedBarber.barber_reviews.filter(r=> r.id !== id)]}));
  }

  function handleCreateToggle(){
    setReviewToggle(-1)
    setEditing(false)
    setInput({content: "", rating: 0, barber_id: selectedBarber.id})
  
  }
 

  function handleEditClick(review){
    
    setEditing(review)
    setInput({content: review.content, rating: review.rating, barber_id: selectedBarber.id })
    
    setReviewToggle({
      edit: review.id
    })
    
  }

  // console.log(input)

  function userReviewOnTop(){
    if(!!user.id&& selectedBarber.barber_reviews.filter(r=>r.client_id === user.id).length>0){
      let reviews = selectedBarber.barber_reviews
      let newReviews = reviews.filter(review => review.client_id !== user.id);

      newReviews.unshift(reviews.find(review=>review.client_id === user.id))
      return newReviews
    } else {
      return selectedBarber.barber_reviews
    }
  }


  return ( !selectedBarber ? null : (
    
  <div>

    {/* if the user is loged in as aclient they see the first one */}
  
    <div>
    <h1>Profile Page for {selectedBarber.first_name} {selectedBarber.last_name} </h1>
    <h4>email: {selectedBarber.email}</h4>
    
   {!selectedBarber.barber_reviews.filter(r=>r.client_id === user.id).length>0 && !!user.id && 
   <div>
    <button onClick={()=> handleCreateToggle(-1)}>leave review</button>
          {reviewToggle === -1 &&
          <BarberReviewForm input={input} setInput = {setInput} editing={editing} setReviewToggle={setReviewToggle}/>
          }
      </div> }

      {userReviewOnTop().map(review=>
        <div key={review.id}>
            
            <div>"{review.content}"</div>
            <div> {review.rating}</div>
            <div>- {client.find(c=> review.client_id === c.id).username}</div>
            
                    {/* make sure that user is logged in and wrote the comment to allow edit capabilities */}
                    {!!user.id && user.id === review.client_id && 
                      <div>
                        <button onClick = {()=>handleEditClick(review)}> edit</button> 
                                {/*handles form and deletetoggle */}
                                {reviewToggle.edit === review.id &&
                                <div> 
                                  <button onClick = {(e)=> handleDelete(e,review.id)}>Delete</button>
                                    <BarberReviewForm input={input} setInput={setInput} editing={editing} setReviewToggle={setReviewToggle}/>
                                </div>}
                      </div>
                      }
                
                    {!!review.barber_review_comments[0]  &&
                      <div>
                        
                      <div> {review.barber_review_comments[0].content}</div>
                      <div>**{selectedBarber.username}**</div>
                      </div>
                    }
          </div>    
    )} 
      </div>


      
</div>))
  
    }

export default BarberDetail
    