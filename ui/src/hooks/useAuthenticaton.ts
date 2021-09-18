import React, { useState, useEffect } from "react"
import getFirebase from "../utils/getFirebase"

export default () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(async () => {
    const firebase = await getFirebase();
    const auth = await firebase.auth()
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [])

  return currentUser
}
