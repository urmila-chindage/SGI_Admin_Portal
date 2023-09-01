import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import { useState } from 'react';

import { useEffect } from 'react';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import axios from "axios";


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Subscribers = ({ className, ...rest }) => {
  const classes = useStyles();

  const [subscribers, setSubscribers] = useState(0);

  const getSubscribersCount = async() =>{
    await axios.get("https://localhost:44312/api/Subscriber")
    .then((res)=>{
      //console.log(res.data.data.Counts);
      setSubscribers(res.data.data[0].Counts);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getSubscribersCount()
  },[])

 return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              SUBSCRIBERS(newsletter)
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {subscribers}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ContactMailIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Subscribers.propTypes = {
  className: PropTypes.string
};

export default Subscribers;
