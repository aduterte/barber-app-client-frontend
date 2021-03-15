
import './App.css';
import  {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {barbersState as barbersAtom,
        clientsState as clientsAtom} from './atoms'

import SearchBar from './components/Searchbar'
import BarberList from './components/BarberList'


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
    })
  
  },[])


  return (
    <div>
      <SearchBar/>
      <BarberList/>
    </div>

  )
}

export default App
