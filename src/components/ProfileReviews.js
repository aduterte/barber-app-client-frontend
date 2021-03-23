import API from '../api'
import ClientReviewCommentForm from './ClientReviewCommentForm'

import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import {barbersState,
        userState} from '../atoms'


export default function BarberReviewForm(props){

  const [reviewToggle, setReviewToggle] = useState({btnToggle: true}),
  [input, setInput] = useState({content: "", rating: 0}),
   barber = useRecoilValue(barbersState),
   user = useRecoilValue(userState)




  function handleCommentEditClick(review){
    // console.log("handle edit comment", review)

    setInput({content: review.client_review_comments[0].content, client_id: review.client.id, id: review.client_review_comments[0].id})
    
    setReviewToggle({
      edit: review.id
    })
  }

  function handleCommentCreate(review){
    setReviewToggle({edit: review.id})

    setInput({content: "", client_id: props.selectedClient.id,client_review_id: review.id})
  }

  function handleCommentDelete(e,id){
    e.preventDefault()
    API.delete(`/client_review_comments/${id}`,{data: {client_id: props.selectedClient.id}})
    .then(res=> {props.setSelectedClient(res.data)});
    setReviewToggle({edit: 0, btnToggle: true})
  }

  
  return(
<div>

    {props.selectedClient.client_reviews.map(review=>
          
      <div key={review.id}>
        <p></p>
        <p></p>
          <div>"{review.content}"</div>
          <div> {review.rating}</div>
          <div>- {barber.find(b=> review.barber_id === b.id).username}</div>
          
                      {/* if the user has a comment w/o a review */}
                    {!!review.client_review_comments.length > 0?
                    <div>
                      <p></p>
                    <div> {review.client_review_comments[0].content}</div>
                    <div>**{props.selectedClient.username}**</div>
                  
                  
                  
                        <div>
                        {reviewToggle.btnToggle && user.id?
                        <div>
                          <button onClick = {()=>handleCommentEditClick(review)}> edit</button> 
                          </div>
                          :null}
                                  {/*handles form and deletetoggle */}
                                  {reviewToggle.edit === review.id &&
                                  <div> 
                                    <button onClick = {(e)=> handleCommentDelete(e,review.client_review_comments[0].id)}>Delete</button>
                                      <ClientReviewCommentForm input={input} setInput={setInput}  setSelectedClient = {props.setSelectedClient} setReviewToggle={setReviewToggle}/>
                                  </div>    
                                  }
                        </div>
                    </div>
                    :
                    <div>
                        <button onClick={()=> handleCommentCreate(review)}>leave review</button>
                        {reviewToggle.edit === review.id &&
                          <ClientReviewCommentForm input={input} setInput={setInput}  setSelectedClient = {props.setSelectedClient} setReviewToggle={setReviewToggle}/>
                        }
                    </div>
                    }
          </div>
               
    )} 
</div>
  )
}