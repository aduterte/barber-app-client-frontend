
import './App.css';
import axios from 'axios';

import { Route, Switch, Redirect } from "react-router-dom"
import  {useEffect, useContext} from 'react'
import API from './api'
import SearchBar from './components/Searchbar'
import BarberDetail from './containers/BarberDetail'
import LoginContainer from './containers/logincontainer'
import NavBar from './components/NavBar';
import AccountSettingsContainer from './containers/AccountSettingsContainer';
import Profile from './containers/Profile'

import {useSetRecoilState,useRecoilState} from 'recoil'
import {barbersState,
        clientsState,
        userState,
        conversationsAtom} from './atoms'
import PortfolioSettings from './components/PortfolioSettings';
import { ActionCableContext } from './index.js'
import WSSubscriptions from './Services/WSSubcriptions';
import MessagesView from './Messages/MessagesView';
function App() {

  const setClients = useSetRecoilState(clientsState),
        setBarbers = useSetRecoilState(barbersState),
        [conversations, setConversations] = useRecoilState(conversationsAtom),
        [user,setUser] = useRecoilState(userState),
        cable = useContext(ActionCableContext)


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
      setConversations(res.data.conversations)
    })
    }  
  }, [setUser, setConversations])

  useEffect(()=>{
    if (user.username){
      cable.subscriptions.create(
        {channel: 'ConversationsChannel', id: user.id, type: localStorage.type},
        {received: (data) => {
            console.log(data)
            if (data){
              // debugger
            }
            setConversations([...conversations, data])
        }}
      )
    }
  })

  return (
    <div className="main">
      <WSSubscriptions/>
      <MessagesView/>
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
