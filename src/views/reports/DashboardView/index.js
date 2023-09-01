import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Subscribers from './Subscribers';
import TrafficByDevice from './TrafficByDevice';
import LatestContacts from './LatestContacts';
import CounterValues from './CounterValues';
import HomeCarousel from './HomeCarousel';
//import VideoCarousel from './VideoCarousel';
import ImgCarousel from './ImgCarousel';
import Headlines from './Headlines';
import SubscribersList from './SubscribersList';
import Modal from './Modal';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
        <Grid item lg={4} md={6} xl={3} xs={12}>
            <Modal />
          </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
            <HomeCarousel />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <Headlines />
          </Grid>
         
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Subscribers />
          </Grid>
          <Grid item lg={6} md={6} xl={4} xs={12}>
            <CounterValues />
          </Grid>
         
          <Grid item lg={6} md={6} xl={4} xs={12}>
            <LatestContacts />
          </Grid>
         
          <Grid item lg={6} md={6} xl={4} xs={12}>
            <SubscribersList />
          </Grid>

          <Grid item lg={6} md={6} xl={4} xs={12}>
            <TrafficByDevice />
          </Grid>
         
           <Grid item lg={6} md={6} xl={6} xs={6}>
            <ImgCarousel />
          </Grid>
         
         
         
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
