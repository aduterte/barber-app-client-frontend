
import './App.css';
import react, {useEffect} from 'react'

import {useRecoilState} from 'recoil'
import {repoState as repoAtom} from './atoms'

import Testing from './components/testing'


function App() {
  // const [repos, setReops] = useRecoilState(repoAtom)
  return (
    <div>
      <Testing/>
    </div>

  )
}

export default App;
