import React from 'react'
import { Link } from "react-router-dom"
import {userState} from "../atoms"
import {useRecoilState} from "recoil"


export default function NavBar(){

    const [user, setUser] = useRecoilState(userState)

    function handleLogout(){
        localStorage.removeItem("token")
        localStorage.removeItem("type")
        setUser({})
    }
    return(
        <div id="nav-bar">
            <div>
                <Link to={`/`} id="nav-bar-left">
                    <div className="home-icon">
                        Home Icon Here
                    </div>
                    <div>
                        Q-Cuts
                    </div>
                </Link>
            </div>
            {user.username ?
            <div id="nav-bar-right">
                <div><img src={user.photo} className="mini-avatar" alt="user avatar"/></div>
                <div>Welcome {user.username}</div>
                <div>Settings</div>
                <div onClick={handleLogout}>Logout</div>
            </div>
            :
            <div id="nav-bar-right">
                <Link to={'/login'}>Login</Link>
            </div>
            }
        </div>
    )
}