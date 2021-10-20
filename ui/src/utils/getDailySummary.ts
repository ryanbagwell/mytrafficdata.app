import { DailySummary } from "../declarations";
import getFirestore from "./getFirestore";


export default async (dateStr: string, locationId: string): Promise<DailySummary> => {
  const fs = await getFirestore();

  return await fs.collection('dailySummaries')
    .doc(`${locationId}-${dateStr}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
      return null;
    }).catch((err) => {
      console.log(err)
    })
}