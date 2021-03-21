import React, {useState} from 'react';
import {userState} from "../atoms"
import {useRecoilState} from "recoil"
import API from "../api"

export default function PortfolioSettings(){

    const [user, setUser] = useRecoilState(userState),
        [newPhoto,setNewPhoto] = useState(""),
        [input, setInput] = useState({comment: ""})

    function handleSubmit(e){
        e.preventDefault()
        const form = new FormData()

        form.append('photo', newPhoto)
        form.append('comment', input.comment)
        form.append('barber_id', user.id)

        API.post('/photos', form, {headers: {"Content-Type": "multipart/form-data"}} )
        .then(res => {
            setUser({...user, ['photos']: [...user.photos, res.data]})
        })
    }

    function handleFile(e){
        let file = e.target.files[0]
        setNewPhoto(file)
    }

    function handleInput(e){
        
        let {name, value} = e.target
       setInput({...input, [name]: value})
      
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input type="file" name="photo"
       accept="image/png, image/jpeg" onChange={handleFile}/>
            <input type="text" name="comment" value={input.comment} onChange={handleInput}/>
            </form>
           {user.photos && user.photos.map(photo => <div key={photo.id}>
               <img src={photo.photo} alt={photo.comment}/>
               <div>{photo.comment}</div>
               </div>)}
        </div>
    )
}