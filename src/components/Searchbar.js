




import {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import { Link } from "react-router-dom"
import {searchTextState as searchTextAtom, 
        barbersState as barbersAtom,
        filteredBarbersState as filteredBarbersAtom,
        selectedBarberState as selectedBarberAtom} from '../atoms'




function SearchBar() {

  const [searchText, setSearchText] = useRecoilState(searchTextAtom)
  const [barbers, setBarbers] = useRecoilState(barbersAtom)
  const [filteredBarbers, setFilteredBarbers] = useRecoilState(filteredBarbersAtom)
  const [selectedBarber, setSelectedBarber] = useRecoilState(selectedBarberAtom)

useEffect(() =>{
  setFilteredBarbers( barbers.filter(b =>{
    if (searchText !== ""){
    return b.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
    b.last_name.toLowerCase().includes(searchText.toLowerCase())}
  })
  ) 
    },[searchText, barbers])


  return (
  
          <div>
      <input
    type="text"
    placeholder="Search"
    value={searchText}
    onChange={e => setSearchText(e.target.value)}
    />


{filteredBarbers.map(b=>
<Link key={b.id} to={`/barbers/${b.id}`} onClick={() => setSelectedBarber(b)}>
  <div > {b.first_name}  {b.last_name}</div>
  </Link>
  )}
</div>
 )
}


export default SearchBar
