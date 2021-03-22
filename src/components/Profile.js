import API from '../api'

import ReviewCommentForm from './ReviewCommentForm'
import {useState , useEffect} from 'react'
import {useRecoilState , useRecoilValue} from 'recoil'
import {selectedClientState, 
        barbersState,
        userState} from '../atoms'


export default function Profile(){
  const [selectedClient, setSelectedClient] = useState({}),
  barber = useRecoilValue(barbersState),
  [reviewToggle, setReviewToggle] = useState({btnToggle: true}),
  [input, setInput] = useState({content: "", rating: 0}),
 
  user = useRecoilValue(userState)

 
  useEffect(() => {
   
    const str = window.location.pathname;
    const n = str.lastIndexOf('/');
    const index = str.substring(n + 1);

    API.get(`/clients/${index}`)
    .then(res => setSelectedClient(res.data) )

  },[setSelectedClient])

  function handleCommentEditClick(review){
    // console.log("handle edit comment", review)

    setInput({content: review.client_review_comments[0].content, client_id: review.client_id, id: review.client_review_comments[0].id})
    
    setReviewToggle({
      edit: review.id
    })
  }

  function handleCommentCreate(review){
    setReviewToggle({edit: review.id})

    setInput({content: "", client_id: selectedClient.id,client_review_id: review.id})
  }

  function handleCommentDelete(e,id){
    e.preventDefault()
    API.delete(`/client_review_comments/${id}`,{data: {client_id: selectedClient.id}})
    .then(res=> {setSelectedClient(res.data)});
    setReviewToggle({edit: 0, btnToggle: true})
  }

  
 


  return(!selectedClient.id ? <div>loading</div> : 
<div>

    <h1>Profile Page for {selectedClient.first_name} {selectedClient.last_name} </h1>
    <h4>email: {selectedClient.email}</h4>
 
    {selectedClient.client_reviews.map(review=>
      
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
                    <div>**{selectedClient.username}**</div>
                  
                  
                   
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
                                      <ReviewCommentForm input={input} setInput={setInput}  setSelectedClient = {setSelectedClient} setReviewToggle={setReviewToggle}/>
                                  </div>    
                                  }
                        </div>
                    
                        
                        
                    </div>
                    :
                    <div>
                         
                         
                         <div>
                        <button onClick={()=> handleCommentCreate(review)}>leave review</button>
                        {reviewToggle.edit === review.id &&
                          <ReviewCommentForm input={input} setInput={setInput}  setSelectedClient = {setSelectedClient} setReviewToggle={setReviewToggle}/>
                        }
                          </div>
                         
                    
                      
                    
                    
                    </div>
                    }
          </div>
              
         
    )} 
      </div>
  )
}