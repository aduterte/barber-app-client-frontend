




import {useRecoilState, useRecoilValue} from 'recoil'
import {userState,
        selectedBarberState} from '../atoms'

export default function ReviewForm(props){
const [selectedBarber, setSelectedBarber] = useRecoilState(selectedBarberState),
      user = useRecoilValue(userState)

  function handleInput(e){
  let {name, value} = e.target
  props.setInput({...props.input,[name]:value})
  }

  

 
  
  function handleSubmit(e){
    const axios = require('axios')
    e.preventDefault()
    
      if (props.editing === false){
        // debugger
      axios.post('http://localhost:3000/barber_reviews', {...props.input, client_id: user.id})
        .then(res=>setSelectedBarber(res.data))
        
        props.setReviewToggle(0)
      
    }else
    {
      
      axios.patch(`http://localhost:3000/barber_reviews/${props.editing.id}`,{...props.input})
      .then(res => setSelectedBarber(res.data))
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



