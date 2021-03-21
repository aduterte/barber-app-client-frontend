




import {useRecoilState, useRecoilValue} from 'recoil'
import {userState,
        selectedBarberState} from '../atoms'

export default function ReviewCommentForm(props){
const [selectedBarber, setSelectedBarber] = useRecoilState(selectedBarberState),
      user = useRecoilValue(userState)

  function handleInput(e){
  
  props.setInput({...props.input, content:e.target.value })
  console.log(props)
}

  

 
  
  function handleSubmit(e){
    const axios = require('axios')
    e.preventDefault()
      if (props.editing === false){
      axios.post('http://localhost:3000/barber_comment_reviews', {...props.input, barber_id: selectedBarber.id, client_id: user.id})
        .then(res=>setSelectedBarber({...selectedBarber, barber_reviews: [...selectedBarber.barber_reviews, res.data]}))
        props.setReviewToggle(0)
    }else
    {
      axios.patch(`http://localhost:3000/barber_review_comments/${props.editing.id}`,{...props.input})
      .then(res => { 
      
        // newBarber.barber_reviews.find(r=>r.id===props.editing.barber_review_id).content = res.data.content
        const filteredReviews = selectedBarber.barber_reviews.filter(r=> r.id !== props.editing.id)
 
       
        console.log({...selectedBarber, barber_reviews: [filteredReviews, props.editing]})
        console.log(selectedBarber)
        // setSelectedBarber({...selectedBarber, barber_reviews: [...selectedBarber.barber_reviews, barber_review_comments: {barber_review_comments:res.data}]})
         }
        )
          props.setReviewToggle(0)
        }

      }
    


  return (
  
          <div>
    <form onSubmit={handleSubmit}>       
      <input name="content"
            placeholder="leave a review..."
            value={props.input.content}
            onChange={handleInput}  />
      
      <button onClick={handleSubmit}>Submit</button>
    </form>

</div>
 )
}



