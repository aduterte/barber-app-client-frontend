
import './App.css';
import axios from 'axios';

import { Route, Switch } from "react-router-dom"
import  {useEffect} from 'react'
import {useSetRecoilState, useRecoilState} from 'recoil'
import {barbersState as barbersAtom,
        clientsState as clientsAtom,
        userState, 
        barberReviewsState as barberReviewsAtom} from './atoms'

import SearchBar from './components/Searchbar'
import BarberDetail from './components/BarberDetail'
import LoginContainer from './containers/logincontainer'
import API from './api'


function App() {

  const setClients = useSetRecoilState(clientsAtom),
    setBarbers = useSetRecoilState(barbersAtom),
    setUser = useSetRecoilState(userState),
    setBarberReviews = useSetRecoilState(barberReviewsAtom)

 



  useEffect(() => {
    axios.get('http://localhost:3000/barbers')
    .then(res => setBarbers(res.data))
    
    axios.get('http://localhost:3000/barbers')
    .then(res => setClients(res.data))
    
    axios.get('http://localhost:3000/barber_reviews')
    .then(res => setBarberReviews(res.data))
  
  
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
