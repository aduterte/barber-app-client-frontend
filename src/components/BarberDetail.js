

import react, {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {selectedBarberState as selectedBarberAtom,
        barberReviewsState as barberReviewsAtom} from '../atoms'




function BarberDetail() {

  const [selectedBarber, setSelectedBarber] = useRecoilState(selectedBarberAtom)
  const barberReviews = useRecoilState(barberReviewsAtom)

 

console.log("selectedBarberState", selectedBarber)
  return (selectedBarber? 
  <div>
    <h1>Profile Page for {selectedBarber.first_name} {selectedBarber.last_name} </h1>
    <h4>email: {selectedBarber.email}</h4>

    {barberReviews.filter(b=>b.barber_id ===selectedBarber.id).map(comment=>
        <div>{comment.content}</div>
        
    )}
  </div>
  )
  
}

export default BarberDetail
