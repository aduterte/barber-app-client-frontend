import React from 'react'
import {useRecoilValue} from 'recoil'
import {userState} from "../atoms"
export default function AccountSettingsComponent(){

    const user = useRecoilValue(userState)

    return (
        <div className="account-details">
            <div className="account-details-top">
                <div>
                    <img src={user.photo} alt="user picture" className="medium-avatar"/>
                </div>
                <div className="account-details-username">
                    {user.username}
                </div>
                
            </div>
            <div className="h-line"/>
            <div>{user.first_name}</div>
            <div>{user.email}</div>
            <div>{user.last_name}</div>
            <div>{user.zip_code}</div>
            
            
        </div>
       
   

    )
}