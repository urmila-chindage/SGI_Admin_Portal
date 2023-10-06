import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { useEffect } from 'react';
import { useState } from 'react';
import { ArrowDownward } from '@material-ui/icons';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  positiveDifferenceIcon: {
    color: colors.green[900]
  },
  negativeDifferenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  },
  spacingClass :{
    marginTop : theme.spacing(10)
  }
}));

const TotalHits = ({ className, ...rest }) => {
  const classes = useStyles();

  const [data, setData] = useState({count: 0})

 
    useEffect(() => {
      axios.get("https://localhost:44312/api/WebSiteLogin/GetOTPnEmail")
     .then(res => {
       console.log(res.data.data.Count)
       //setData({count: res.data.MonthlyCount});
       setData({count:res.data.data.Count})
     })
   }, [])
 

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item className={classes.spacingClass}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL HITS 
              
            <Typography
            color="textSecondary"
            variant="caption"
            >
            {"   "}(This 30 Days)
          </Typography>
           
          </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {data.count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        
      </CardContent>
    </Card>
  );
};

TotalHits.propTypes = {
  className: PropTypes.string
};

export default TotalHits;
