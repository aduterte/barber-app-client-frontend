
import './App.css';
import { Route, Switch } from "react-router-dom"

import  {useEffect} from 'react'
import {useSetRecoilState, useRecoilState} from 'recoil'
import {barbersState as barbersAtom,
        clientsState as clientsAtom,
        userState} from './atoms'

import SearchBar from './components/Searchbar'
// import BarberList from './components/BarberList'
import BarberDetail from './components/BarberDetail'
import LoginContainer from './containers/logincontainer'
import API from './api'


function App() {

  const setClients = useSetRecoilState(clientsAtom),
    setBarbers = useSetRecoilState(barbersAtom),
    [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    const URL = "http://localhost:3000"
    fetch(`${URL}/barbers`)
    .then(res => res.json())
    .then(barbers => {
      setBarbers(barbers)
    })
    fetch(`${URL}/clients`)
    .then(res => res.json())
    .then(clients => {
      setClients(clients)
    fetch(`${URL}/barber_reviews`)
    
    })
  
  },[setBarbers, setClients])

  // token authentication on refresh
  useEffect(()=>{
    if (localStorage.token){
    let options = {headers: {'Authenticate': localStorage.token, 'User': localStorage.type}}
    API.get(`/logins`, options)
    .then(res => {
      
      setUser(res.data.user)
    })
    }  
  }, [setUser])

  // componentDidUpdate for userState
  useEffect(()=>{ 
    console.log(user)
  },[user])

  return (
    <div>

      <Switch>      
        <Route
          exact path="/"
          render={() => (
          <div>
            <SearchBar/>
           
          </div>
          )} 
           />
           
         <Route
          exact path="/barbers/:barberId"
          component={BarberDetail}/>
        <Route exact path="/login">
          <div>
            <LoginContainer/>
          </div>
        </Route>
      </Switch>
    </div>

  )
}

export default App
