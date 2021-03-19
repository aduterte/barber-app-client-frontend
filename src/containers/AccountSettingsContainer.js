import React from 'react'
// import {useRecoilState} from 'recoil'
// import {userState} from "../atoms"
import AccountSettingsComponent from '../components/AccountDetailsComponent'

export default function AccountSettingsContainer(){

    // const [user, setUser] = useRecoilState(userState)

    return (
        <div id="account-settings">
            <AccountSettingsComponent/>
        </div>
    )
}