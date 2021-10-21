import React, { useState, useEffect } from "react"
import getFirestore from "../utils/getFirestore"

export default () => {
  const [firestore, setFirestore] = useState(null)

  useEffect(async () => {
    const fb = await getFirestore();
    setFirestore(fb);
  }, [])

  return firestore

}
