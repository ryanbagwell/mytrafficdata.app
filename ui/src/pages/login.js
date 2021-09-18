import React, { useEffect } from "react"
import getFirebase from "../utils/getFirebase"
import "firebaseui/dist/firebaseui.css"

const startAuth = async () => {
  const firebase = await getFirebase()
  const firebaseui = await import("firebaseui")

  const uiConfig = {
    signInSuccessUrl: "/",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: "<your-tos-url>",
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign("<your-privacy-policy-url>")
    },
  }

  const ui = new firebaseui.auth.AuthUI(firebase.app().auth())
  ui.start("#firebaseui-auth-container", uiConfig)
}

const Login = () => {
  useEffect(startAuth, [])
  return <div id="firebaseui-auth-container"></div>
}

export default Login
