import React, { useState, useEffect } from "react"
import getFirebase from "../utils/getFirebase"

export default () => {
  const [firebase, setFirebase] = useState(null)

  useEffect(async () => {
    const fb = await getFirebase();
    setFirebase(fb);
  }, [])

  return firebase

}
