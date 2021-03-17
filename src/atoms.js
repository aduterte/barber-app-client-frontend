import { atom  }from 'recoil'

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



export const userState = atom({
  key: "userState",
  default: {}
})

export const inputState = atom({
  key: "inputState",
  default: {content: "", rating: 0}
})

