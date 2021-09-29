/* Returns counts from firebase real time database */
import getFirebase from "./getFirebase"
import { wrapInCache } from "./lsCache"


export default wrapInCache(
  async (locationId: string, date: string) => {
    const firebase = await getFirebase()

    const d = new Date(date)

    const startTime = d.getTime() / 1000

    const endTime = (d.getTime() / 1000) + (60 * 60 * 24 * 1000)

    return await firebase.database().ref('counts')
      .orderByChild('endTime')
      .startAt(startTime)
      .endBefore(endTime)
      .get()
      .then((snapshot) => {
        try {
          const d = snapshot.val()
          const vals = Object.values(d)
          return vals.filter(v => v.location === locationId)
        } catch(err) {
          console.log(err)
        }
      })
  },
  "location",
  true
)