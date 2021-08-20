import React from "react"
import firebase from "gatsby-plugin-firebase"
import "firebase/auth"

const Logout = () => {
  if (typeof window === "undefined") return <span />
  firebase.auth().signOut()
  window.location = "/"
  return <span />
}

export default Logout
