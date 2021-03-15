

import react, {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {selectedBarberState as selectedBarberAtom} from '../atoms'




function BarberDetail() {

  const [selectedBarber, setSelectedBarber] = useRecoilState(selectedBarberAtom)


console.log("selectedBarberState", selectedBarber)
  return (
  <div>
    <h1>Profile Page for {selectedBarber.first_name} {selectedBarber.last_name} </h1>
    <h4>email: {selectedBarber.email}</h4>
  </div>
  )
}

export default BarberDetail
