import React, {useState, useEffect, useRef} from 'react';
import { useStore, LocationDataStoreProvider } from "../../stores/locationData"
import { observer } from "mobx-react"
import useFirestore from '../../hooks/useFirestore'
import {Paper, Typography, Container, Card, CardContent, Box} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles"
import formatDate from 'date-fns/format';
import loadable from '@loadable/component'

const Chart = loadable(() => import('react-apexcharts'))

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
    marginBottom: '25px',
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
  const [chartSeries, setChartSeries] = useState([])
  const styles = useStyles();

  useEffect(async () => {
    if (!firestore || !selectedLocation) return;

    const query = firestore
      .collection("rawCounts")
      .where('location', '==', firestore.collection('locations').doc(selectedLocation.id))
      .orderBy('countTimestamp', 'desc');

    const initialCounts = await query.limit(50)
      .get()
      .then(({docs, empty, size}) => {
        const countsArr = docs.map((d) => d.data());
        countsArr.shift();
        return countsArr;
      }).catch((err: Error) => {
        console.error(err);
        return [];
      })

    setCounts(initialCounts);

    const unsubscribe = await query.limit(1)
      .onSnapshot(({docs}) => {
        setCounts((prevCounts) => [
          ...docs.map((doc) => doc.data()),
          ...prevCounts,
        ]);
      });

    return () => unsubscribe()

  }, [firestore, selectedLocation])

  useEffect(() => {
    setChartSeries(
      counts.map((c) => {
        return {
          x: formatDate(new Date(c.countDateTime), 'h:mm'),
          y: Math.round(c.correctedSpeed),
        }
      }).reverse()
    );
  }, [counts])

  const getDisplayCount = () => {
    return counts[counts.length - 1];
  }

  const chartConfig = {
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enagled: false,
      }
    },
    yaxis: {
      title: {
        text: 'Speed in mph'
      }
    }
  }

  const series = [
    {
      name: "Speed history",
      data: chartSeries,
    }
  ]

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
        <Box>
          <Typography
            variant="h5"
            component="h2"
            style={{ width: "100%", textAlign: "center", marginBottom: 20 }}
          >
            History
          </Typography>

          {typeof window !== 'undefined' && (
            <Chart
              options={chartConfig}
              series={series}
              type="line"
            />
          )}
        </Box>
      </Container>

    </LocationDataStoreProvider>
  )
})