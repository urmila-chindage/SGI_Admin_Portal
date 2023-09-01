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

import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { NotificationManager } from 'react-notifications';


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
    maxWidth: '350px',
    maxHeight: '350px'
  }
}));



const AchivementCard = ({ className, achivement, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

const deleteAchivementCard = async id => {
  await axios
    .delete(`https://localhost:44312/api/Achivement?AId=${id}`)
    .then(res => {
      console.log('Record is deleted', res);
      NotificationManager.success('Achievement Data Deleted', 'Successful!', 2000);
      navigate(0);
    })
    .catch(error => {
      console.log(error);
    });
};
 
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <img
            alt="Achievement"
            src={achivement.Image}
            className={classes.image}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
         {achivement.Title}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Achived By: {achivement.Category}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Achived on: {achivement.CreatedDate}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Department: {achivement.Department}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          {achivement.Description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <a href={achivement.File} target={achivement.File}>
              <GetAppIcon className={classes.statsIcon} color="action" />

              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Download Uploaded File
              </Typography>
            </a>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Button onClick={() => deleteAchivementCard(achivement.AId)}>
              <DeleteIcon className={classes.statsIcon} color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Delete Achievement
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

AchivementCard.propTypes = {
  className: PropTypes.string,
  achivement: PropTypes.object.isRequired
};

export default AchivementCard;
