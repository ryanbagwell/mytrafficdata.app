/* Returns counts from firebase real time database */
import getFirestore from "./getFirestore"
import { wrapInCache } from "./lsCache"
import type {QuerySnapshot} from '@firebase/firestore-types';


export default wrapInCache(
  async (locationId: string, date: string, done: Function) => {
    const firestore = await getFirestore();

    // Get a date object in the local timezone
    const d = new Date(date)

    // Get unix time in milliseconds in zulu timezone
    const startTime = d.getTime()

    // Add 23:59:59 in milliseonds to get the end time
    const endTime = startTime + ((60 * 60 * 24 - 1)* 1000)

    const location = firestore.collection('locations').doc(locationId)

    const counts = await firestore.collection('rawCounts')
      .where('location', '==', location)
      .where('countTimestamp', '>',  startTime)
      .where('countTimestamp', '<',  endTime)
      .get()
      .then(({docs, empty, size}: QuerySnapshot) => {
        return docs.map((d) => d.data())
      }).catch((err: Error) => {
        console.error(err)
      })

    return counts
  },
  "location",
  true
)
