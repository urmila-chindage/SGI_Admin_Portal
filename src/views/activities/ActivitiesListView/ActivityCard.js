import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
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
      maxWidth: '200px',
      maxHeight: '200px'
  }
}));

const ActivityCard = ({ className, activity, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const deleteActivityData = async id => {
    await axios
      .delete(`https://localhost:44312/api/Activity?ActId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
toast.success(`${res.data.Message}`);
      })
      .catch(error => {
        console.log(error);
        toast.error(error);
      });
  };


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
    <ToastContainer/>
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          {activity.File &&
              activity.File.map((d,i) => (
                    <a href={d} target="blank" key={i}>
                        <img
                        alt="Activity"
                        src={d}
                        className={classes.image}
                        />
                    </a>
              ))
          }
          
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
         {activity.Title}
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
         {activity.Description}
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
         Type: {" "}{activity.Type}
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          Department: {" "}{activity.Department}
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
         Duration: {" "}{activity.Duration}
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
         Category: {" "}{activity.EventFor}
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
         Date: {" "}{activity.DatePickerDialog}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
        {activity.File1 && (
          <a href={activity.File1} target={activity.File1}>
          <Grid
            className={classes.statsItem}
            item
          >
            <GetAppIcon
              className={classes.statsIcon}
              color="action"
            />
            
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
        <Button
          onClick={() => deleteActivityData(activity.ActId)}
        >
        <Grid
            className={classes.statsItem}
            item
          >
            <DeleteIcon
              className={classes.statsIcon}
              color="action"
            />
            
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              Delete Record
            </Typography>
          </Grid>
        </Button>
        </Grid>
      </Box>
    </Card>
  );
};

ActivityCard.propTypes = {
  className: PropTypes.string,
  activity: PropTypes.object.isRequired
};

export default ActivityCard;
