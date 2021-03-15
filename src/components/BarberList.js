


import {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {searchTextState as searchTextAtom, 
        barbersState as barbersAtom,
        filteredBarbersState as filteredBarbersAtom} from '../atoms'




function BarberList() {

  const [searchText, setSearchText] = useRecoilState(searchTextAtom)
  const [barbers, setBarbers] = useRecoilState(barbersAtom)
  const [filteredBarbers, setFilteredBarbers] = useRecoilState(filteredBarbersAtom)
 
useEffect(() =>{
  setFilteredBarbers( barbers.filter(b =>{
    return b.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
    b.last_name.toLowerCase().includes(searchText.toLowerCase())
  })
  ) 
    },[searchText, barbers])


  return (
    <div>

{filteredBarbers.map(b=>
  <div key={b.id}> {b.first_name}  {b.last_name}</div>
  )}
</div>
)
  //   filteredBarbers.map(b=>

  //   )
}


export default BarberList
