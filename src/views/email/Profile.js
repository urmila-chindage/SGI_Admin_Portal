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


const user = {
  avatar: '/static/images/avatars/avatar_6.jpg',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
    backgroundColor: '#000',
    fontSize: 30
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
          <Avatar className={classes.avatar}>rtyy</Avatar>
          <Typography color="textPrimary" gutterBottom variant="h3">
            rtryty
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
          rtrtry
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
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
         
        >
          Change Account
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
