import { useEffect, useState } from "react"
import getUserLocations from "../utils/getUserLocations"

export default (userId) => {
  const [userLocations, setUserLocations] = useState([])

  useEffect(() => {
    if (!userId) return
    const fetchLocations = async () => {
      const locations = await getUserLocations(userId)
      setUserLocations(locations)
    }

    fetchLocations()
  }, [userId])

  return userLocations
}
