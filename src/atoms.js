import { atom, selectorFamily  }from 'recoil'

export const searchTextState = atom({
  key: "searchText",
  default: ""
})

export const barbersState = atom({
  key: "barbersState",
  default: []
})


export const clientsState = atom({
  key: "clientsState",
  default: []
})

export const filteredBarbersState = atom({
  key: "filteredBarbersState",
  default: []
})

export const selectedBarberState = atom({
  key: "selectedBarberState",
  default: null
 })

 export const approvedApptsState = atom({
  key: "approvedApptsState",
  default: []
 })



 export const userState = atom({
  key: "userState",
  default: {}
})

export const conversationsAtom = atom({
  key: "conversationsAtom",
  default: []
})

export const convoSelector = selectorFamily({
  key: "convoSelector",
  get: id => ({get}) => { 
    let convos = get(conversationsAtom)
    return convos.filter(convo => convo.id === id)[0]
  }
 
})

// export const clientReviewsState = atom({
//   key: "clientReviewsState",
//   default: {}
// })



