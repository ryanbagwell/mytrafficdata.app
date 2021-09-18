import React, {useEffect} from "react"
import getFirebase from "../utils/getFirebase"

const Logout = () => {
  useEffect(() => {
    async function logMeOut() {
      const firebase = await getFirebase();
      firebase.auth().signOut()
    }
    logMeOut()
  }, [])
  return <span />
}

export default Logout
