




import { useState} from 'react'
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



  return (
  
          <div>
    <form onSubmit={handleSubmit}>       
      <input name="content"
            placeHolder="leave a review..."
            value={input.content}
            onChange={handleInput}  />
      <select onChange={handleInput}>
        <option>--</option>
        <option value={1} selected="selected">1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </form>

</div>
 )
}



