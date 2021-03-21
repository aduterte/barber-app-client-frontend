




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

  console.log(props.input)

 
  
  function handleSubmit(e){
    const axios = require('axios')
    e.preventDefault()
      if (props.editing === false){

      axios.post('http://localhost:3000/barber_review_comments', {...props.input, client_id: user.id})
        .then(res=> {setSelectedBarber(res.data)})
        props.setReviewToggle(0)
    }else
    {
      axios.patch(`http://localhost:3000/barber_review_comments/${props.editing.id}`,{...props.input})
      .then(res => setSelectedBarber(res.data)
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



