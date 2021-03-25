import API from '../api'
import { useRecoilState } from 'recoil'
import {userState} from '../atoms'


export default function ReviewCommentForm(props){
  const [user, setUser] = useRecoilState(userState)

  function handleInput(e){
  
  props.setInput({...props.input, content:e.target.value })

}

 
  
  function handleSubmit(e){

    e.preventDefault()
      if (!props.input.id){

      API.post('/client_review_comments', {...props.input})
        .then(res=> {  
                      let i = user.client_reviews.indexOf(props.review)
                      let array = [...user.client_reviews]
                      array[i] = {...array[i], client_review_comment: res.data}
                      setUser({...user, client_reviews: array })
                    })

          props.setReviewToggle({edit: 0, btnToggle: true})
      }else
    {
      API.patch(`/client_review_comments/${props.input.id}`,{...props.input})
      .then(res => { 
        let i = user.client_reviews.indexOf(props.review)
        let array = [...user.client_reviews]
        array[i] = {...array[i], client_review_comment: res.data}
        setUser({...user, client_reviews: array })
        
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



