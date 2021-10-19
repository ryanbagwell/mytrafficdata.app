import getFirestore from "../utils/getFirestore"

export default async () => {
  const fs = await getFirestore()
 return await fs
    .collection("locations")
    .where("isPublic", "==", true)
    .get()
    .then(({docs, empty, size}) => {
      if (docs) {
        return docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        })
      }
      return []
    })
    .catch((err) => {
      console.log(err)
    })
}
