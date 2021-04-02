import React, { useState } from "react"
import firebase from "gatsby-plugin-firebase"

export default () => {
  const [currentUser, setCurrentUser] = useState(null)

  if (typeof window === "undefined") return currentUser

  firebase.auth().onAuthStateChanged(user => {
    setCurrentUser(user)
  })
  return currentUser
}
