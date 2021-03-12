

import react, {useEffect} from 'react'
import { atom , useRecoilState }from 'recoil'

const repoState = atom({
  key: "repos",
  default: 5
})

function Testing() {
  return (
    <div>
      {repos}
    </div>

  )
}

export default Testing;
