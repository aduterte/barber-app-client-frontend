
import './App.css';
import react, {useEffect} from 'react'

import {useRecoilState} from 'recoil'
import {barbersState as barbersAtom,
        clientsState as clientsAtom} from './atoms'

import SearchBar from './components/Searchbar'


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
    </div>

  )
}

export default App
