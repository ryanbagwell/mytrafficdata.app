/* eslint-disable no-restricted-globals */
import React from "react"
import { makeAutoObservable } from "mobx"
import { useLocalStore } from "mobx-react"


class GlobalStore {
  isSidebarMenuOpen = false;

  constructor() {
    makeAutoObservable(this)
  }

  setIsSidebarMenuOpen = (isMenuOpen) => {
    this.isSidebarMenuOpen = isMenuOpen
  }

}

const initializedGlobalStore = new GlobalStore()

const StoreContext = React.createContext(initializedGlobalStore)

const Provider = StoreContext.Provider

export const GlobalStoreProvider = ({ children }) => {
  const store = useLocalStore(() => initializedGlobalStore)
  return <Provider value={store}>{children}</Provider>
}

export const useStore = () => {
  const store = React.useContext(StoreContext)
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.")
  }
  return store
}
