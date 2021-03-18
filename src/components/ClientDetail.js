import axios from 'axios';
import ClientReviewForm from './ClientReviewForm'
import {useState ,useEffect} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import {selectedClientState, 
        barbersState,
        userState} from '../atoms'



export default function ClientDetail() {

  const [selectedClient, setSelectedClient] = useRecoilState(selectedClientState),
        barber = useRecoilValue(barbersState),
        [reviewToggle, setReviewToggle] = useState(false),
        [input, setInput] = useState({content: "", rating: 0}),
        [editing,setEditing] = useState({}),
        user = useRecoilValue(userState)



  useEffect(() => {
   
const str = window.location.pathname;
const n = str.lastIndexOf('/');
const index = str.substring(n + 1);

axios.get(`http://localhost:3000/clients/${index}`)
.then(res => setSelectedClient(res.data))
  },[setSelectedClient])

 function handleDelete(e,id){
   e.preventDefault()
  axios.delete(`http://localhost:3000/client_reviews/${id}`)
  .then(setSelectedClient({...selectedClient, client_reviews: [...selectedClient.client_reviews.filter(r=> r.id !== id)]}));
  }

function handleCreateToggle(id){
  setReviewToggle(-1)
  setEditing(false)
  setInput({content: "", rating: 0})
 
}

function handleEditClick(review){
  setEditing(review)
  setInput({content: review.content, rating: review.rating})
  
  setReviewToggle({
    edit: review.id
  })
}



  
  return ( !selectedClient ? null : (
  <div>
    <h1>Profile Page for {selectedClient.first_name} {selectedClient.last_name} </h1>
    <h4>email: {selectedClient.email}</h4>
    <button onClick={()=> handleCreateToggle(-1)}>leave review</button>
    {reviewToggle === -1? 
    <ClientReviewForm input={input} setInput = {setInput} editing={editing} setReviewToggle={setReviewToggle}/>:null} 


    {selectedClient.client_reviews.map(review=>
      <div key={review.id}>
          <div>"{review.content}"</div>
          <div> {review.rating}</div>
          <div>- {barber.find(b=> review.barber_id === b.id).username}</div>
         
          {!user.id? null :
            <div>
              <button onClick = {()=>handleEditClick(review)}> edit</button>
            
                {reviewToggle.edit === review.id?
                <div> 
                  <button onClick = {(e)=> handleDelete(e,review.id)}>Delete</button>
                    <ClientReviewForm input={input} setInput={setInput} editing={editing} setReviewToggle={setReviewToggle}/>
                </div>
                    :null    
                }
            </div>
          }
          
      </div>    
    )} 

  </div>
  )
  )
  
    }


    