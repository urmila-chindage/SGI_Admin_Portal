import { Box, Card, makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Results from './Results';
import { useEffect } from 'react';
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  floatingBtn: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    float: 'right'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const ViewAuditReports = ({ className, ...rest }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState([]);

  const getAllAuditData = async() =>{
        await axios.get("https://localhost:44312/api/AuditReport")
        .then((res)=>{
          console.log(res.data.data);
          setData(res.data.data);
        })
        .catch((error)=>{
          console.log(error);
        })
  }

  useEffect(() => {
    getAllAuditData();
  }, []);

 

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <div className={classes.root}>
        <Results audit={data} />
      </div>
    </Card>
  );
};

export default ViewAuditReports;
