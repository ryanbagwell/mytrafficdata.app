const firebase = require("firebase-admin")

const locationId = "ScE2ZThK9LdE35WqO1bu"

const userId = "uzCAcJtaL8N8yCWAS9agB0hotwY2"

process.env.GOOGLE_APPLICATION_CREDENTIALS = `${__dirname}/../daemon/serverKey.json`

firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
  databaseURL: process.env.databaseURL,
})

//firebase.database.enableLogging(true)

const db = firebase.database()

const firestore = firebase.firestore()

function summarizeDay(days, dateString) {
  const summary = days.reduce(
    (final, current) => {
      const { correctedSpeed, endTime, magnitude } = current

      const d = new Date(endTime * 1000)
      const hour = d.getHours()
      const speed = Math.round(correctedSpeed)

      d.setMinutes(0)
      d.setSeconds(0)
      d.setMilliseconds(0)

      final[hour].push(speed)

      return final
    },
    [...Array(24).keys()].reduce((f, c) => ({ ...f, [c]: [] }), {})
  )

  return summary
}

//const day = summarizeDay(sampleCounts)

const owner = firestore.collection("users").doc(userId)

async function createLocationCountDoc(locationId) {
  const locationRef = firestore.collection(`locationCounts`).doc(locationId)

  await locationRef.set(
    {
      owner: owner,
    },
    { merge: true }
  )

  return locationRef
}

const pushHourlyCounts = async (counts = [], date) => {
  const locationDocRef = firestore
    .collection(`dailyCounts`)
    .doc(`${date}-${locationId}`)

  data = {
    owner: firestore.doc(`users/${userId}`),
    location: firestore.doc(`locations/${locationId}`),
    dateTimestamp: Math.floor(new Date().getTime() / 1000),
    dateString: new Date(date).toISOString(),
    speedsByHour: counts,
  }

  await locationDocRef.set(data)

  console.log(`Migrated ${date}`)
}

const ref = db
  .ref("speedreports/444-Upham-Street/counts")
  .orderByKey()
  .startAt("2021-04-1")
  .limitToFirst(30)
  .once("value")
  .then(async (item) => {
    const data = item.val()

    //const countObjs = Object.values(data)

    const dates = Object.keys(data)

    for (const date of dates) {
      const counts = Object.values(data[date])

      const summary = summarizeDay(counts)

      await pushHourlyCounts(summary, date)
    }

    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    process.exit(0)
  })
