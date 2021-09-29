/* Returns counts from firebase */
import getFirestore from "./getFirestore"
import { wrapInCache } from "../utils/lsCache"

export default wrapInCache(
  async (locationId: string, date: string) => {
    const fs = await getFirestore()

    const dateString = new Date(date).toISOString()

    return await fs
      .collection("dailyCounts")
      .where("location", "==", fs.doc(`/locations/${locationId}`))
      .where("dateString", "==", dateString)
      .get()
      .then((snapshot) => {
        try {
          const d = snapshot.docs[0].data()
          return d
        } catch(err) {}
      })
  },
  "location",
  true
)
