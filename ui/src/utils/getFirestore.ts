import getFirebase from "./getFirebase"

let instance: any = null;

export default async () => {
  if (instance) return instance;
  const firebase = await getFirebase()
  try {
    instance = firebase.firestore();
    return instance;
  } catch (err) {
    console.error(err)
    return null
  }

}
