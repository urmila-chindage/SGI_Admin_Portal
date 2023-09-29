import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
    backgroundColor: '#000',
    fontSize: 20
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();

  const [userData, setUserData] = useState({
    email: '',
    name: ''
  });

 return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar}>GS LLP</Avatar>
          <Typography color="textPrimary" gutterBottom variant="h3">
            Ghodawat Softech LLP
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="h6"
          >
          ghodawatsoftech.developers@gmail.com
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="subtitle2"
          >
            All emails will be sent using this email Id
          </Typography>
        </Box>
      </CardContent>
      <Divider />
     
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
