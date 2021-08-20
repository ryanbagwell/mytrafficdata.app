import getFirestore from "./getFirestore"
import { cacheData, getCachedData } from "../utils/lsCache"

const getCacheKey = (locationId: string, date: string) =>
  `location-${locationId}-${date}`

export default async (locationId: string) => {
  const fs = getFirestore()

  return await fs
    .collection("locations")
    .doc(locationId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data()
      } else {
        return null
      }
    })
}
