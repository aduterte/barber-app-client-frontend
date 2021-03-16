
import './App.css';
import axios from 'axios';

import { Route, Switch } from "react-router-dom"
import  {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {barbersState as barbersAtom,
        clientsState as clientsAtom,
        barberReviewsState as barberReviewsAtom} from './atoms'

import SearchBar from './components/Searchbar'
import BarberDetail from './components/BarberDetail'


function App() {

  const [clients, setClients] = useRecoilState(clientsAtom)
  const [barbers, setBarbers] = useRecoilState(barbersAtom)
  const [barberReviews, setBarberReviews] = useRecoilState(barberReviewsAtom)


  useEffect(() => {
    axios.get('http://localhost:3000/barbers')
    .then(res => setBarbers(res.data))
    
    axios.get('http://localhost:3000/barbers')
    .then(res => setClients(res.data))
    
    axios.get('http://localhost:3000/barber_reviews')
    .then(res => setBarberReviews(res.data))
  
  
  },[])

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
          
      </Switch>
    </div>

  )
}

export default App
