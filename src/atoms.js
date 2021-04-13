import { atom, selectorFamily, atomFamily }from 'recoil'
import {isAfter} from "date-fns"

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

export const openConvos = atom({
  key: "openConvos",
  default: []
})

export const convoSelectorUnread = selectorFamily({
  key: "convoSelectorUnread",
  get: id => ({get}) => {
    let convos = get(conversationsAtom)
    let convo = convos.filter(convo => convo.id === id)[0]
    let unread = convo.messages.filter(m => isAfter(new Date(m.created_at), new Date(convo.b_last_read)))
    return unread.length
  }
})

export const convoAtom = atomFamily({
  key: "convoAtom",
  default: selectorFamily({
    key: "convoAtomDefault",
    get: convo => ({get}) => { 
          let convos = get(conversationsAtom)
    return convos.filter(c => c.id === convo.id)[0]
      // let convos = get(conversationsAtom)
      // return convos[convos.indexOf(convo)]
    }
  })
})

export const convoSelector = selectorFamily({
  key: "convoSelector",
  get: convo => ({get}) => { 
    // let convos = get(conversationsAtom)
    // return convos.filter(convo => convo.id === id)[0]
    let convos = get(conversationsAtom)
    // debugger
    // return convos[convos.indexOf(convo)]
    return convos.filter(c => c.id === convo.id)[0]
  },
  set: convo => ({set, get}, data) =>{
    // debugger
    let array = get(conversationsAtom)
    let convos = [...array]
    let index = convos.indexOf(convo)
    convos[index] = {...convos[index], messages: [...convo.messages, data]}
    set(conversationsAtom, convos)},
})

// export const clientReviewsState = atom({
//   key: "clientReviewsState",
//   default: {}
// })



