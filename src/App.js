
import './App.css';
import { Route, Switch } from "react-router-dom"

import  {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {barbersState as barbersAtom,
        clientsState as clientsAtom} from './atoms'

import SearchBar from './components/Searchbar'
// import BarberList from './components/BarberList'
import BarberDetail from './components/BarberDetail'


function App() {

  const [clients, setClients] = useRecoilState(clientsAtom)
  const [barbers, setBarbers] = useRecoilState(barbersAtom)

  useEffect(() => {
    fetch(`http://localhost:3000/barbers`)
    .then(res => res.json())
    .then(barbers => {
      setBarbers(barbers)
    })
    fetch(`http://localhost:3000/clients`)
    .then(res => res.json())
    .then(clients => {
      setClients(clients)
    fetch(`http://localhost:3000/barber_reviews`)
    
    })
  
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
