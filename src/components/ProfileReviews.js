import API from '../api'
import ClientReviewCommentForm from './ClientReviewCommentForm'
import { useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import {barbersState,
        userState} from '../atoms'


export default function BarberReviewForm(props){

  const [reviewToggle, setReviewToggle] = useState({btnToggle: true}),
  [input, setInput] = useState({content: "", rating: 0}),
   barber = useRecoilValue(barbersState),
  [user, setUser] = useRecoilState(userState)





  function handleCommentEditClick(review){
    setInput({content: review.client_review_comment.content, client_id: user.id, id: review.client_review_comment.id})
    
    setReviewToggle({
      edit: review.id
    })
  }

  function handleCommentCreate(review){
    setReviewToggle({edit: review.id})

    setInput({content: "", client_id: user.id,client_review_id: review.id})
  }

  function handleCommentDelete(e,review){
    e.preventDefault()
    API.delete(`/client_review_comments/${review.client_review_comment.id}`)
    
      let i = user.client_reviews.indexOf(review)
      let array = [...user.client_reviews]
      array[i] = {...array[i], client_review_comment:null}
      setUser({...user, client_reviews: array })
    setReviewToggle({edit: 0, btnToggle: true})
  }
  
  
  
  return(
<div>
 

    {user.client_reviews.map(review=>
          
      <div key={review.id}>
        <p></p>
        <p></p>
          <div>"{review.content}"</div>
          <div> {review.rating}</div>
          <div>- {review.barber.username}</div>
          
                      {/* if the user has a comment w/o a review */}
                    {!!review.client_review_comment?
                    <div>
                      <p></p>
                    <div> {review.client_review_comment.content}</div>
                    <div>**{user.username}**</div>
                  
                  
                  
                        <div>
                        {reviewToggle.btnToggle && user.id?
                        <div>
                          <button onClick = {()=>handleCommentEditClick(review)}> edit</button> 
                          </div>
                          :null}
                                  {/*handles form and deletetoggle */}
                                  {reviewToggle.edit === review.id &&
                                  <div> 
                                    <button onClick = {(e)=> handleCommentDelete(e,review)}>Delete</button>
                                      <ClientReviewCommentForm 
                                          input={input} 
                                          setInput={setInput}  
                                          review = {review} 
                                          setReviewToggle={setReviewToggle}/>
                                  </div>    
                                  }
                        </div>
                    </div>
                    :
                    <div>
                        <button onClick={()=> handleCommentCreate(review)}>leave review</button>
                        {reviewToggle.edit === review.id &&
                          <ClientReviewCommentForm 
                              input={input} 
                              setInput={setInput}  
                              review = {review} 
                              setReviewToggle={setReviewToggle}/>
                        }
                    </div>
                    }
          </div>
               
    )} 
</div>
  )
}