




import { useState, useEffect} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import {userState,
        selectedBarberState} from '../atoms'

export default function ReviewForm(){
const [input, setInput] = useState({content: "", rating: 0})
const [selectedBarber, setSelectedBarber] = useRecoilState(selectedBarberState),
      user = useRecoilValue(userState)

  function handleInput(e){
  let {name, value} = e.target
  setInput({...input,[name]:value })
  }

  

 
  
  function handleSubmit(e){

    const axios = require('axios')
    e.preventDefault()
    // let newReviews = 

    axios.post('http://localhost:3000/barber_reviews', {...input, barber_id: selectedBarber.id, client_id: user.id})
    .then(res=>setSelectedBarber({...selectedBarber, barber_reviews: [...selectedBarber.barber_reviews, res.data]})
      ) 
      
    }


console.log(input)
  return (
  
          <div>
    <form onSubmit={handleSubmit}>       
      <input name="content"
            placeholder="leave a review..."
            value={input.content}
            onChange={handleInput}  />
      <select name ='rating' onChange={handleInput}>
        <option selected="selected">--</option>
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



