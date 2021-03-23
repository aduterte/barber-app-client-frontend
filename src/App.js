
import './App.css';
import axios from 'axios';

import { Route, Switch, Redirect,Link } from "react-router-dom"
import  {useEffect} from 'react'
import API from './api'
import SearchBar from './components/Searchbar'
import BarberDetail from './components/BarberDetail'
import LoginContainer from './containers/logincontainer'
import NavBar from './components/NavBar';
import AccountSettingsContainer from './containers/AccountSettingsContainer';
import Profile from './containers/Profile'

import {useSetRecoilState,useRecoilState} from 'recoil'
import {barbersState,
        clientsState,
        userState} from './atoms'
import PortfolioSettings from './components/PortfolioSettings';

function App() {

  const setClients = useSetRecoilState(clientsState),
        setBarbers = useSetRecoilState(barbersState),
        [user,setUser] = useRecoilState(userState)


  useEffect(() => {
    axios.get('http://localhost:3000/barbers')
    .then(res => setBarbers(res.data))
    
    axios.get('http://localhost:3000/clients')
    .then(res => setClients(res.data))
    
  
  },[setBarbers, setClients])

  // token authentication on refresh
  useEffect(()=>{
    if (localStorage.token){
    let options = {headers: {'Authenticate': localStorage.token, 'User': localStorage.type}}
    API.get(`/logins`, options)
    .then(res => {
      
      setUser(res.data)
    })
    }  
  }, [setUser])


  return (
    <div className="main">
      <NavBar/>
      <div id="main-bottom">
      <Switch>      
        <Route
          exact path="/"
          component={SearchBar} 
        />
        <Route exact path="/barbers/:barberId"
          component={BarberDetail}/>
        <Route exact path="/clients/:clientId"
          component={Profile}/>
        <Route exact path="/login">
            {user.username ? <Redirect to="/"/> :  
            <LoginContainer/>}
        </Route>
        <Route exact path="/account-settings">
          <AccountSettingsContainer/>
        </Route>
        <Route exact path="/portfolio-settings">
          <PortfolioSettings/>
        </Route>
      </Switch>
      </div>
    </div>

  )
}

export default App
