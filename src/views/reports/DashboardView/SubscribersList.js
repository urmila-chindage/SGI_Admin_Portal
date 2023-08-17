import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  FormControl,
  Button
} from '@material-ui/core';

import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const SubscribersList = ({ className, ...rest }) => {
  const classes = useStyles();

  const [subscribers, setSubScribers] = useState([]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="SubScribers" />
      <Divider />
      <Box
        height="450px"
        display="flex"
        flexDirection="column"
        overflow="scroll"
      >
        <List>
       
            <ListItem>
              <ListItemText
                primary="urmilasirase@gmail.com"
                secondary="fdffdgfd"
               
              />
            </ListItem>
        
        </List>
      </Box>
    </Card>
  );
};

SubscribersList.propTypes = {
  className: PropTypes.string
};

export default SubscribersList;
