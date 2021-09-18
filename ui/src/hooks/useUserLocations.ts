import { useEffect, useState } from "react"
import useFirebase from "./useFirebase"

export default (userId) => {
  const [userLocations, setUserLocations] = useState([])
  const firebase = useFirebase()

  useEffect(() => {
    if (!userId) return
    if (!firebase) return;
    console.log(firebase)
    const firestore = firebase.firestore()

    firestore
      .collection("locations")
      .where("ownerId", "==", userId)
      .get()
      .catch((err) => {
        console.log(err)
      }).then((results) => {
        const locations = results.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        })
        console.log(locations)
        setUserLocations(locations)
      })

  }, [userId, firebase])

  return userLocations
}
