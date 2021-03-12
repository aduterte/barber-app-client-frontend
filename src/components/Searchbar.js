

import react, {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {searchTextState as searchTextAtom} from '../atoms'




function SearchBar() {

  const [searchText, setSearchText] = useRecoilState(searchTextAtom)

  console.log(searchText)
  return (
    <div>
      <input
    type="text"
    placeholder="Search"
    value={searchText}
    onChange={e => setSearchText(e.target.value)}
    />
    </div>

  )
}

export default SearchBar
