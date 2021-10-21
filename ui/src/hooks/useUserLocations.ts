import { useEffect, useState } from "react"
import useFirebase from "./useFirebase"

export default (userId) => {
  const [userLocations, setUserLocations] = useState([])
  const firebase = useFirebase()

  useEffect(() => {
    if (!firebase || !userId) return;

    const firestore = firebase.firestore()

    firestore
      .collection("locations")
      .where("owner", "==", firestore.collection('users').doc(userId))
      .get()
      .then(({docs, size, empty}) => {
        if (docs) {
          const locations = docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
          setUserLocations(locations)
        }
      })
      .catch((err) => {
        console.log(err)
      })

  }, [userId, firebase])

  return userLocations
}
