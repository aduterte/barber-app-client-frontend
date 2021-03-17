




import {useRecoilState, useRecoilValue} from 'recoil'
import {userState,
        selectedBarberState} from '../atoms'

export default function ReviewForm(props){
const [selectedBarber, setSelectedBarber] = useRecoilState(selectedBarberState),
      user = useRecoilValue(userState)

  function handleInput(e){
  let {name, value} = e.target
  props.setInput({...props.input,[name]:value })
  }

  

 
  
  function handleSubmit(e){
    const axios = require('axios')
    e.preventDefault()
      if (props.editing === false){
      axios.post('http://localhost:3000/barber_reviews', {...props.input, barber_id: selectedBarber.id, client_id: user.id})
        .then(res=>setSelectedBarber({...selectedBarber, barber_reviews: [...selectedBarber.barber_reviews, res.data]}))
        props.setReviewToggle(0)
    }else
    {
      axios.patch(`http://localhost:3000/barber_reviews/${props.editing.id}`,{...props.input})
      .then(res => {
        const filteredReviews = selectedBarber.barber_reviews.filter(r=> r.id !== props.editing.id)
          setSelectedBarber({...selectedBarber, barber_reviews: [...filteredReviews, res.data]})})
          props.setReviewToggle(0)
        }

      }
    


console.log(props.editing)
  return (
  
          <div>
    <form onSubmit={handleSubmit}>       
      <input name="content"
            placeholder="leave a review..."
            value={props.input.content}
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



