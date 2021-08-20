import React, { useState } from "react"
import firebase from "gatsby-plugin-firebase"

export default () => {
  if (typeof window === "undefined") return null
  const auth = firebase.auth()
  const [currentUser, setCurrentUser] = useState(auth.currentUser)

  auth.onAuthStateChanged((user) => {
    setCurrentUser(user)
  })
  return currentUser
}
