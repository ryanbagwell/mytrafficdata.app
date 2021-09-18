/* eslint-disable no-restricted-globals */
import React from "react"
import { makeAutoObservable } from "mobx"
import { useLocalStore } from "mobx-react"
import getFirebase from "../utils/getFirebase"


class GlobalStore {
  isSidebarMenuOpen = false
  currentUser = null
  auth = null

  userProfile = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    displayName: "",
    photoURL: "",
    uid: null,
    email: "",
    phoneNumber: "",
  }

  constructor() {
    makeAutoObservable(this)
    this.setAuthStateChanged()
  }

  setAuthStateChanged = async() => {
    const firebase = await getFirebase();
    if (!firebase) return;
    this.auth = firebase.auth()
    this.auth.onAuthStateChanged(async (user) => {
      await this.setCurrentUser(user)
      await this.fetchUserProfileData()
    })

  }

  fetchUserProfileData = async () => {
    if (!this.currentUser) return
    const firebase = await getFirebase();
    if (!firebase) return;
    const fs = firebase.firestore()

    const extra = await fs.collection("users").doc(this.currentUser.uid).get()

    const data = extra.data()

    const updated = Object.keys(this.userProfile).reduce((final, key) => {
      return {
        ...final,
        [key]: data[key] || this.currentUser[key],
      }
    }, {})

    this.userProfile = {
      ...this.userProfile,
      ...updated,
    }
  }

  setCurrentUser = async (user) => {
    this.currentUser = user
  }

  setIsSidebarMenuOpen = (isMenuOpen) => {
    this.isSidebarMenuOpen = isMenuOpen
  }

  updateExtraUserProfileData = async (data) => {
    const firebase = await getFirebase();
    if (!firebase) return;
    const fs = firebase.firestore()

    const doc = fs.collection("users").doc(this.userProfile.uid)

    const dataToUpdate = Object.entries(data).reduce((final, [key, value]) => {
      if (key in this.currentUser) {
        return final
      }
      return {
        ...final,
        [key]: value,
      }
    }, {})

    await doc.set(dataToUpdate, { merge: true }).catch((err) => {
      console.log(err)
    })

    this.userProfile = {
      ...this.userProfile,
      ...dataToUpdate,
    }
  }

  updateFirebaseUserProfileData = async (data) => {
    const dataToUpdate = Object.entries(data).reduce((final, [key, value]) => {
      if (key in this.currentUser) {
        return {
          ...final,
          [key]: value,
        }
      }
      return final
    }, {})

    await this.auth.currentUser.updateProfile(dataToUpdate)

    this.userProfile = {
      ...this.userProfile,
      ...dataToUpdate,
    }
  }

  updateUserProfile = async (profileData: UserProfileData) => {
    await this.updateFirebaseUserProfileData(profileData)
    await this.updateExtraUserProfileData(profileData)
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

export const store = initializedGlobalStore
