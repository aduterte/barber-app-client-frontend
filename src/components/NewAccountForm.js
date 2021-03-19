import React, {useState} from 'react'
import {userState as user} from '../atoms'
import {useRecoilState} from 'recoil'
import API from "../api"

export default function NewAccountForm(){

    const [input, setInput] = useState({username: "", avatar: "", zip_code: "", first_name: "", last_name: "", email: "", password: "", password_confirmation:"", isBarber: false}),
    [userInfo, setUserinfo] = useRecoilState(user)

    function handleSubmit(e){
        console.log("why")
        
        e.preventDefault()
        
        const form = new FormData()
        let endpoint = ""

        form.append('first_name', input.first_name)
        form.append('last_name', input.last_name)
        form.append('email', input.email)
        form.append('password', input.password)
        form.append('zip_code', input.zip_code)
        form.append('username', input.username)
        form.append('avatar', input.avatar)
        
        debugger
                
        input.isBarber === true ? endpoint = 'barbers' : endpoint = 'clients'
        // fetch(`http://localhost:3000/${endpoint}`, {
        //     method: 'POST',
        //     body: form
        // })
        // .then(res => res.json())
        // .then(data => {
        //            if(!data.error){
        //         // debugger
        //         setUserinfo(data.user)
        //         localStorage.setItem("token", data.token)
        //         localStorage.setItem("type", input.isBarber)
                
        //     }
        //     else{
        //         console.log(data.error)
        //     }
        // })
        API.post(endpoint, form,{headers: {"Content-Type": "multipart/form-data"}})
        .then(res => {
            if(!res.data.error){
                debugger
                setUserinfo(res.data.user)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("type", input.isBarber)
                
            }
            else{
                console.log(res.data.error)
            }
        })
        
    }

    function handleInput(e){
        
        let {name, value} = e.target
        name !== "isBarber" ? setInput({...input, [name]: value}) : setInput({...input, isBarber: !input.isBarber})
      
        console.log(input)
    }

    function handleFile(e){
        console.log(e.target)
        let test = e.target.files[0]
        setInput({...input, ['avatar']: test})
        debugger
    }
    return (
        <div>
             <form onSubmit={handleSubmit}>
             <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg" onChange={handleFile}/><br/>
             <input type="text" name="first_name" value={input.first_name} onChange={handleInput} placeholder="Enter First Name"/>
                <br/>
                <input type="text" name="last_name" value={input.last_name} onChange={handleInput} placeholder="Enter Last Name"/>
                <br/>
                <input type="text" name="username" value={input.username} onChange={handleInput} placeholder="Enter Username"/>
                <br/>
                <input type="text" name="email" value={input.email} onChange={handleInput} placeholder="Enter email"/>
                <br/>
                <input type="password" name="password" value={input.password} onChange={handleInput} placeholder="Enter password"/>
                <br/>
                <input type="password" name="password_confirmation" value={input.password_confirmation} onChange={handleInput} placeholder="Enter password confirmation"/>
                <br/>
                <input type="text" name="zip_code" value={input.zip_code} onChange={handleInput} placeholder="Enter zip code"/>
                <br/>
                Are you a barber? <input type="checkbox" name="isBarber" onChange={handleInput}/>
                <br/>
                <input type="submit"/>
            </form>
        </div>
    )
}