import BarberReviewForm from '../components/BarberReviewForm'
import API from '../api'
import { useRecoilValue} from 'recoil'
import {useState ,} from 'react'
import {clientsState,
        userState} from '../atoms'

export default function BarberReviews(props) {

  const client = useRecoilValue(clientsState),
  [reviewToggle, setReviewToggle] = useState({btnToggle: true}),
  [input, setInput] = useState({content: "", rating: 0}),
  [editing,setEditing] = useState({}),
  user = useRecoilValue(userState)


  function handleDelete(e,id){
    e.preventDefault()
    API.delete(`/barber_reviews/${id}`)
    .then(props.setSelectedBarber({...props.selectedBarber, barber_reviews: [...props.selectedBarber.barber_reviews.filter(r=> r.id !== id)]}));
    setReviewToggle({edit: 0, btnToggle: true})
  }

  function handleCreateToggle(){
    setReviewToggle({edit: -1})
    setEditing(false)
    setInput({content: "", rating: 0, barber_id: props.selectedBarber.id})
  
  }
 

  function handleEditClick(review){
    
    setEditing(review)
    setInput({content: review.content, rating: review.rating, barber_id: props.selectedBarber.id, id:review.id })
    setReviewToggle({
      edit: review.id
    })
  }
  function userReviewOnTop(){
    if(!!user.id&& props.selectedBarber.barber_reviews.filter(r=>r.client.id === user.id).length>0){
      let reviews = props.selectedBarber.barber_reviews
      let newReviews = reviews.filter(review => review.client.id !== user.id);

      newReviews.unshift(reviews.find(review=>review.client.id === user.id))
      return newReviews
    } else {
      return props.selectedBarber.barber_reviews
    }
  }
  
  return(
    <div>
    {!props.selectedBarber.barber_reviews.filter(r=>r.client.id === user.id).length>0 && !!user.id && 
      <div>
        <button onClick={()=> handleCreateToggle(-1)}>leave review</button>
              {reviewToggle.edit === -1 &&
              <BarberReviewForm input={input} 
                                setInput = {setInput} 
                                setSelectedBarber = {props.setSelectedBarber} 
                                selectedBarber = {props.selectedBarber}
                                setReviewToggle={setReviewToggle}
                                user = {user}/>
              }
          </div> 
          }
  
        {userReviewOnTop().map(review=>
          <div key={review.id}>
              
              <div>"{review.content}"</div>
              <div> {review.rating}</div>
              <div>- {review.client.username}</div>
              
                      {/* make sure that user is logged in and wrote the comment to allow edit capabilities */}
                      {!!user.id && user.id === review.client.id && 
                        <div>
                          {reviewToggle.btnToggle&&
                          <div>
                          <button onClick = {()=>handleEditClick(review)}> edit</button>
                          </div> 
                          }
                                  {/*handles form and deletetoggle */}
                                  {reviewToggle.edit === review.id &&
                                  <div> 
                                    <button onClick = {(e)=> handleDelete(e,review.id)}>Delete</button>
                                      <BarberReviewForm input={input} 
                                                        setInput={setInput} 
                                                        setSelectedBarber = {props.setSelectedBarber} 
                                                        selectedBarber = {props.selectedBarber}
                                                        editing={editing} 
                                                        setReviewToggle={setReviewToggle}/>
                                  </div>}
                        </div>
                        }
                  
                      {!!review.barber_review_comments  &&
                        <div>
                          
                        <div> {review.barber_review_comments.content}</div>
                        <div>**{props.selectedBarber.username}**</div>
                        </div>
                      }
            </div>    
      )} 
        </div>
        )
      }