import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';

import { useEffect } from 'react';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  }
}));

const LatestContacts = ({ className, ...rest }) => {
  const classes = useStyles();

  const [contacts, setContacts] = useState([]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        subtitle={`${contacts.length} in total`}
        title="Latest contacts"
       
      />
      <Divider />
      <Box
        height="450px"
        display="flex"
        flexDirection="column"
        overflow="scroll"
      >
        <List>
        
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.purple}>sfsdf</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="dfdf"
                secondary={`Phone No: 9098764523`}
              />
              <ListItemText secondary={`Email: "urmilasirase@gmail.com"`} />
            </ListItem>
         
        </List>
      </Box>
      <Divider />
    </Card>
  );
};

LatestContacts.propTypes = {
  className: PropTypes.string
};

export default LatestContacts;
