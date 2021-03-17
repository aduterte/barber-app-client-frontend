




import {useEffect} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import { Link } from "react-router-dom"
import {searchTextState, 
        barbersState,
        filteredBarbersState} from '../atoms'




function SearchBar() {

  const [searchText, setSearchText] = useRecoilState(searchTextState),
        barbers = useRecoilValue(barbersState),
        [filteredBarbers, setFilteredBarbers] = useRecoilState(filteredBarbersState)
  

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
  <Link key={b.id} to={`/barbers/${b.id}`}>
    <div > {b.first_name}  {b.last_name}</div>
  </Link>
  )}
</div>
 )
}


export default SearchBar
