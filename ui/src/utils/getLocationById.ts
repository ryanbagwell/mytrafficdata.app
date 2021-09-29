import getFirestore from "./getFirestore"
import { cacheData, getCachedData } from "../utils/lsCache"

const getCacheKey = (locationId: string, date: string) =>
  `location-${locationId}-${date}`

export default async (locationId: string) => {
  const fs = await getFirestore()

  return await fs
    .collection("locations")
    .doc(locationId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return {
          ...doc.data(),
          id: locationId,
        }
      } else {
        return null
      }
    })
}
