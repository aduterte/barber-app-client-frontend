import API from '../api'


export default function ReviewCommentForm(props){

  function handleInput(e){
  
  props.setInput({...props.input, content:e.target.value })

}

console.log(props.input.id)
 
  
  function handleSubmit(e){

    e.preventDefault()
      if (!props.input.id){

      API.post('/client_review_comments', {...props.input})
        .then(res=> props.setSelectedClient(res.data))
        
        props.setReviewToggle({edit: 0, btnToggle: true})
    }else
    {
      API.patch(`/client_review_comments/${props.input.id}`,{...props.input})
      .then(res => props.setSelectedClient(res.data))
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



