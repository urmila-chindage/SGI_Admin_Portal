import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  image: {
    maxWidth: '100px',
    maxHeight: '100px',
    marginRight:'10px'
  }
}));



const PlacementReportCard = ({ className, placement,handleDrawerClose, ...rest }) => {
  const navigate = useNavigate();

  const deletePlacementData = async id => {
    await axios
      .delete(`https://localhost:44312/api/Placement?PId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
        toast.success(`${res.data.Message}`);
        handleDrawerClose();
        navigate(0);
      })
      .catch(error => {
        console.log(error);
        toast.error(error);
      });
  };

  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
      <Box display="flex" justifyContent="center" mb={3}>
          {placement.File &&
            placement.File.map((d, i) => (
              <a href={d} target="blank" key={i}>
                <img alt="PlacementImages" src={d} className={classes.image} />
              </a>
            ))}
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
         {placement.Title}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          {placement.Description}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Campus Type: {placement.CampusType}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Eligible Departments: {placement.Eligible_Department}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Organized By: {placement.Organizedby}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Company Name: {placement.CompanyName}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Date: {placement.DatePicker}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
        {placement.File1 && (
          <a href={placement.File1} target={placement.File1}>
            <Grid className={classes.statsItem} item>
              <GetAppIcon className={classes.statsIcon} color="action" />

              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Download File
              </Typography>
            </Grid>
          </a>
        )}
          <Box>
            <Grid className={classes.statsItem} item>
            <Button onClick={() => deletePlacementData(placement.PId)}>
              <DeleteIcon className={classes.statsIcon} color="action" />

              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Delete Record
              </Typography>
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Card>
  );
};

PlacementReportCard.propTypes = {
  className: PropTypes.string,
  placement: PropTypes.object.isRequired
};

export default PlacementReportCard;
