




import {useRecoilState, useRecoilValue} from 'recoil'
import {userState,
        selectedClientState} from '../atoms'

export default function ReviewForm(props){
const [selectedClient, setSelectedClient] = useRecoilState(selectedClientState),
      user = useRecoilValue(userState)

  function handleInput(e){
  let {name, value} = e.target
  props.setInput({...props.input,[name]:value })
  }

  

 
  
  function handleSubmit(e){
    const axios = require('axios')
    e.preventDefault()
      if (props.editing === false){
      axios.post('http://localhost:3000/client_reviews', {...props.input, client_id: selectedClient.id, barber_id: user.id})
        .then(res=>setSelectedClient({...selectedClient, client_reviews: [...selectedClient.client_reviews, res.data]}))
        props.setReviewToggle(0)
    }else
    {
      axios.patch(`http://localhost:3000/client_reviews/${props.editing.id}`,{...props.input})
      .then(res => {
        const filteredReviews = selectedClient.client_reviews.filter(r=> r.id !== props.editing.id)
          setSelectedClient({...selectedClient, client_reviews: [...filteredReviews, res.data]})})
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
      <select name ='rating' onChange={handleInput}>
        <option defaultValue={0}>--</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </form>

</div>
 )
}



