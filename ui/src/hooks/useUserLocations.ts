import { useEffect, useState } from "react"
import useFirestore from "./useFirestore"

export default (userId) => {
  const [userLocations, setUserLocations] = useState([])
  const firestore = useFirestore()

  useEffect(() => {
    if (!firestore || !userId) return;

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

  }, [userId, firestore])

  return userLocations
}
