import API from '../api'
import {useState} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import {userState,
        selectedClientState} from '../atoms'

export default function ReviewCommentForm(props){
const [selectedClient, setSelectedClient] = useState(selectedClientState),
      user = useRecoilValue(userState)

  function handleInput(e){
  
  props.setInput({...props.input, content:e.target.value })

}


 
  
  function handleSubmit(e){

    e.preventDefault()
      if (props.editing === false){

      API.post('/client_review_comments', {...props.input})
        .then(res=> props.setSelectedClient(res.data))
        props.setReviewToggle({edit: 0, btnToggle: true})
    }else
    {
      API.patch(`/client_review_comments/${props.editing.id}`,{...props.input})
      .then(res => props.setSelectedClient(res.data)
        )
          props.setReviewToggle({edit: 0, btnToggle: true})
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



