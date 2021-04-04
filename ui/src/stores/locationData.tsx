/* eslint-disable no-restricted-globals */
import React from "react"
import { makeAutoObservable } from "mobx"
import { useLocalStore } from "mobx-react"

class LocationDataStore {
  queryDate: string = null

  constructor() {
    makeAutoObservable(this)
  }

  setQueryDate = (dateTime: string) => {
    this.queryDate = dateTime
  }
}

const initializedStore = new LocationDataStore()

const StoreContext = React.createContext(initializedStore)

const Provider = StoreContext.Provider

export const LocationDataStoreProvider = ({ children }) => {
  const store = useLocalStore(() => initializedStore)
  return <Provider value={store}>{children}</Provider>
}

export const useStore = () => {
  const store = React.useContext(StoreContext)
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.")
  }
  return store
}
