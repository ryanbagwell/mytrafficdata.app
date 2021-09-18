import getFirebase from "./getFirebase"

export default async () => {
  const firebase = await getFirebase()
  try {
    return firebase.firestore();
  } catch (err) {
    return null
  }

}
