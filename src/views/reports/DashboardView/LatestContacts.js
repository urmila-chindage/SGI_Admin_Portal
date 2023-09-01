import React, { useState,useEffect } from 'react';
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

import { deepPurple } from '@material-ui/core/colors';
import axios from "axios";

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

  const getAllContact = async() =>{
    await axios.get("https://localhost:44312/api/LContact/GetAllLContact")
    .then((res)=>{
      console.log(res.data.data);
      setContacts(res.data.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const getFormatedArray = arr => {
    let combinedData = 'data:text/csv;charset=utf-8, Name, Email, ContactNo, \r\n';

    arr.forEach((val, idx) => {
      let propertiesArray = [];
      propertiesArray.push(val.Name);
      propertiesArray.push(val.Email);
      propertiesArray.push(val.ContactNo);
      combinedData += propertiesArray.join(',') + '\r\n';
    });

    return combinedData;
  };

  const handleCSVDownload = e => {
    var link = document.createElement('a');
    let data = getFormatedArray(contacts);
    var encodedUri = encodeURI(data);
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'contacts.csv');
    document.body.appendChild(link);

    link.click();
  };

  useEffect(()=>{
    getAllContact();
  },[])

  const DownloadCSV = () => (
    <Box>
      <FormControl className={classes.formControl}>
        <Button onClick={handleCSVDownload} color="primary" size="large" variant="contained">Export CSV</Button>
      </FormControl>
    </Box>
  );

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
     <CardHeader
        subtitle={`${contacts.length} in total`}
        title="Latest contacts"
        action={<DownloadCSV />}
      />
      <Divider />
      <Box
        height="450px"
        display="flex"
        flexDirection="column"
        overflow="scroll"
      >
       <List>
          {contacts.map((contact, index) => (
            <ListItem divider={index < contact.length - 1} key={index}>
              <ListItemAvatar>
                <Avatar className={classes.purple}>{contact.Name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={contact.Name}
                secondary={`Phone No: ${contact.ContactNo}`}
              />
              <ListItemText secondary={`Email: ${contact.Email}`} />
            </ListItem>
          ))}
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
