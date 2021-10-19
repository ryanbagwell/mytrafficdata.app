import { useEffect, useState } from "react"
import getPublicLocations from "../utils/getPublicLocations"

export default () => {
  const [publicLocations, setPublicLocations] = useState([])

  useEffect(() => {
    (async () => {
      const locations = await getPublicLocations();
      setPublicLocations(locations)
    })()
  }, [])

  return publicLocations
}
