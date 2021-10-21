import React, {useState, useEffect} from 'react';
import { useStore, LocationDataStoreProvider } from "../../stores/locationData"
import { observer } from "mobx-react"
import useFirestore from '../../hooks/useFirestore'
import {Paper, Typography, Container, Card, CardContent} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 25,
  },
  paper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: "100%",
    padding: "20px 20px 0 20px",
    flexWrap: "wrap",
  },
  cardTitle: {
    fontSize: 14,
  },
  cardStat: {
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    marginBottom: 20,
  },
}))

export default observer((props) => {
  const {selectedLocation, setSelectedLocation} = useStore()
  const firestore = useFirestore();
  const [counts, setCounts] = useState([])
  const styles = useStyles();

  useEffect(async () => {
    if (!firestore || !selectedLocation) return;

    await firestore.collection("rawCounts")
      .where('location', '==', firestore.collection('locations').doc(selectedLocation.id))
      .orderBy('countTimestamp', 'desc')
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          setCounts([
            ...counts,
            doc.data(),
          ])
        })
      });
  }, [firestore, selectedLocation])

  const getDisplayCount = () => {
    console.log(counts[counts.length - 1])
    return counts[counts.length - 1];
  }

  return (
    <LocationDataStoreProvider>
      <Container className={styles.container}>
        <Paper className={styles.paper}>
        <Typography
          variant="h5"
          component="h2"
          style={{ width: "100%", textAlign: "center", marginBottom: 20 }}
        >
          Live Traffic Data
        </Typography>

          {counts.length && (
            <Card className={styles.card}>
              <CardContent>
                <Typography variant="h5" component="h2" className={styles.cardStat}>
                  {Math.round(getDisplayCount().correctedSpeed)} m.p.h.
                </Typography>
                <Typography
                  className={styles.cardTitle}
                  color="textSecondary"
                  gutterBottom
                >
                at {new Date(getDisplayCount().countDateTime).toLocaleString()}
                </Typography>
              </CardContent>
          </Card>

          )}
        </Paper>
      </Container>

    </LocationDataStoreProvider>
  )
})