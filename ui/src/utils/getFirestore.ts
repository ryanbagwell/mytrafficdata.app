import firebase from "./getFirebase"

export default (() => {
  let cached = null

  return () => {
    if (cached !== null) return cached
    cached = firebase.firestore()
    return cached
  }
})()
