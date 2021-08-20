import getFirestore from "../utils/getFirestore"

const fs = getFirestore()

export default async (userId) => {
  const results = await fs
    .collection("locations")
    .where("ownerId", "==", userId)
    .get()
    .catch((err) => {
      console.log(err)
    })
  if (results) {
    return results.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
  }
  return []
}
