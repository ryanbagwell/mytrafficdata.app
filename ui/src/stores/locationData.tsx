/* eslint-disable no-restricted-globals */
import React from "react"
import { makeAutoObservable } from "mobx"
import { useLocalStore } from "mobx-react"
import getLocationById from '../utils/getLocationById';

import type {Location} from '../declarations'

class LocationDataStore {
  queryDate: string = null
  selectedLocation: Location | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setQueryDate = (dateTime: string) => {
    this.queryDate = dateTime
  }

  setSelectedLocation = (location: Location) => {
    this.selectedLocation = location
  }

  setSelectedLocationById = async (locationId: any) => {
    const loc = await getLocationById(locationId)
    if (loc) {
      this.setSelectedLocation(loc)
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
