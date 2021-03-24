




import {useRecoilState} from 'recoil'
import API from '../api'
import {selectedBarberState} from '../atoms'

export default function BarberReviewForm(props){
// const  setSelectedBarber = useRecoilState(selectedBarberState)
//       // user = useRecoilValue(userState)

  function handleInput(e){
  let {name, value} = e.target
  props.setInput({...props.input,[name]:value})
  }

  

 
  
  function handleSubmit(e){
// console.log(props.selectedBarber)
    e.preventDefault()

      if (!props.input.id){
        API.post('/barber_reviews', {...props.input, client_id: props.user.id})
          .then(res=>{
            props.setSelectedBarber({...props.selectedBarber, barber_reviews: [...props.selectedBarber.barber_reviews, res.data]})
          })
          props.setReviewToggle({edit: 0, btnToggle: true}) 
      }else
      {
      API.patch(`/barber_reviews/${props.input.id}`,{...props.input})
        .then(res =>{
      
          let filtered = props.selectedBarber.barber_reviews.filter(r=> r.id !== res.data.id)
          props.setSelectedBarber({...props.selectedBarber, barber_reviews: [...filtered, res.data]})
          // console.log({...props.selectedBarber, barber_reviews: [...filtered, res.data]}, props.selectedBarber)
        })

      } 
      // debugger
      props.setReviewToggle({edit: 0, btnToggle: true})
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



