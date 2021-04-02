/* eslint-disable no-restricted-globals */
import React from "react"
import { makeAutoObservable } from "mobx"
import { useLocalStore } from "mobx-react"

class LocationDataStore {
  queryDate: number = Date.now() / 1000

  constructor() {
    makeAutoObservable(this)
  }

  setQueryDate = (dateTime: string | number) => {
    if (typeof dateTime === "string") {
      const d = new Date(dateTime)
      this.queryDate = d.getTime() / 1000
    } else {
      this.queryDate = dateTime
    }
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
