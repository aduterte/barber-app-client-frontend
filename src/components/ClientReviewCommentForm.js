import API from '../api'
import { useRecoilValue } from 'recoil'
import {userState} from '../atoms'


export default function ReviewCommentForm(props){
  const user = useRecoilValue(userState)

  function handleInput(e){
  
  props.setInput({...props.input, content:e.target.value })

}

console.log(props.input.id)
 
  
  function handleSubmit(e){

    e.preventDefault()
      if (!props.input.id){

      API.post('/client_review_comments', {...props.input})
        .then(res=> {
          let i =  props.user.client_reviews.indexOf(props.review)
          let reviews = [props.user.client_reviews]
          console.log(user)

          // props.setuser(res.data)
          
          })
        
        props.setReviewToggle({edit: 0, btnToggle: true})
    }else
    {
      API.patch(`/client_review_comments/${props.input.id}`,{...props.input})
      .then(res => { 
         let i =  props.user.client_reviews.indexOf(props.review)
        let reviews = [props.user.client_reviews]
        console.log(user)
})
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



